import json
from math import sqrt
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from django.shortcuts import get_object_or_404
from datetime import datetime, timedelta
from django.utils.timezone import make_aware

from .models import Route, Pee, Poop, Drink, Interaction
from user.models import User
from .serializers import RouteSerializer, UpdateRouteSerializer, PeeIconSerializer, PoopIconSerializer, DrinkIconSerializer, InteractionIconSerializer, GetSummaryStatisticsSerializer

possible_icons = {'pee': [Pee, PeeIconSerializer], 'poop': [Poop, PoopIconSerializer],
                  'drink': [Drink, DrinkIconSerializer], 'interaction': [Interaction, InteractionIconSerializer]}


# single route functionality
@api_view(['GET', 'PUT', 'DELETE'])
def handle_route(request, route_id):
    request.data['user'] = request.user.id
    try:
        route = Route.objects.get(id=route_id)
        if route.user != request.user:
            return Response(status=status.HTTP_403_FORBIDDEN)
    except Route.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    # handle getting a route
    if request.method == "GET":
        serializer = RouteSerializer(route)
        return Response(serializer.data)

    # handle updating a route
    if request.method == "PUT":
        serializer = UpdateRouteSerializer(route, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    # handle deleting a route
    if request.method == "DELETE":
        operation = route.delete()
        data = {"isSuccessful": False}
        if operation:
            data["isSuccessful"] = True
        return Response(status=status.HTTP_200_OK, data=data)


@api_view(['POST', 'GET'])
def route(request):
    request.data['user'] = request.user.id
    # request.data['total_distance'] use= -1 #idk if this is the right place to put it

    # create new route under user
    if request.method == "POST":
        serializer = RouteSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    # get all routes under user
    if request.method == "GET":
        routes = Route.objects.filter(user=request.user.id)
        data = []
        for route in routes:
            serializer = RouteSerializer(route)
            data.append(serializer.data)
        return Response(data)


# single icon functionality
@api_view(['GET', 'DELETE'])
def handle_icon(request, icon_name, icon_id):
    model_name = None
    serializer_name = None
    icon_name = icon_name.lower()
    if icon_name not in possible_icons:
        return Response("not valid icon type", status=status.HTTP_400_BAD_REQUEST)
    else:
        model_name = possible_icons[icon_name][0]
        serializer_name = possible_icons[icon_name][1]

    icon = get_object_or_404(model_name, id=icon_id)

    route = get_object_or_404(Route, id=icon.route.id)
    if route.user != request.user:
        return Response(status=status.HTTP_403_FORBIDDEN)

    # return icon associated with specified icon id
    if request.method == "GET":
        serializer = serializer_name(icon)
        return Response(serializer.data)

    # delete icon associated with specified icon id
    if request.method == "DELETE":
        operation = icon.delete()
        data = {"isSuccessful": False}
        if operation:
            data["isSuccessful"] = True
        return Response(status=status.HTTP_200_OK, data=data)


@api_view(['POST', 'GET'])
def icon(request, icon_name, route_id):
    route = get_object_or_404(Route, id=route_id)
    if route.user != request.user:
        return Response(status=status.HTTP_403_FORBIDDEN)

    model_name = None
    serializer_name = None
    icon_name = icon_name.lower()
    if icon_name not in possible_icons:
        return Response("not valid icon type", status=status.HTTP_400_BAD_REQUEST)
    else:  # set the appropriate model and serializer based on icon type
        model_name = possible_icons[icon_name][0]
        serializer_name = possible_icons[icon_name][1]

    # create new icon for specified route
    if request.method == "POST":
        request.data['route'] = route_id
        print(request.data)
        serializer = serializer_name(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    # get all icons (with specified type) associated with specified route
    if request.method == "GET":
        icons = model_name.objects.filter(route=route_id)
        data = []
        for icon in icons:
            serializer = serializer_name(icon)
            data.append(serializer.data)
        return Response(data)


# get all icons (regardless of type) associated in specified route
@api_view(['GET'])
def get_all_icons(request, route_id):
    route = get_object_or_404(Route, id=route_id)

    if route.user != request.user:
        return Response(status=status.HTTP_403_FORBIDDEN)

    icon_names = ['pee', 'poop', 'drink', 'interaction']
    i = 0
    data = []

    for icon in icon_names:
        model = possible_icons[icon_names[i]][0]
        model_serializer = possible_icons[icon_names[i]][1]
        icons = model.objects.filter(route=route_id)
        for icon in icons:
            serializer = model_serializer(icon)
            data.append(serializer.data)
        i += 1

    return Response(data)


def calculate_distance(sx, sy, ex, ey):
    return sqrt((sx - ex)**2 + (sy - ey)**2)


# import sys

@api_view(['GET'])
def get_summary(request):
    userid = request.user.id
    route = Route.objects.filter(user=request.user.id).order_by('end_time').last() #this is O(logn) so it might become a speed problem in the future
    # print(route.id, file=sys.stderr)
    datalist = []

    # TODO: calculate total distance for the first time
    total_distance = route.total_distance
    if total_distance == None:
        coords = route.coordinates.all()
        if len(coords) == 1:
            pass  # or whatever breaks me out of the outer if statement

        total_distance = 0.0

        s_lat = coords[0].latitude
        s_lon = coords[0].longitude

        for i, coord in enumerate(coords):
            if i == 0:
                pass

            e_lat = coords[i].latitude
            e_lon = coords[i].longitude

            total_distance += calculate_distance(s_lat, s_lon, e_lat, e_lon)
            s_lat, s_lon = e_lat, e_lon

        route.total_distance = total_distance
        route.save(update_fields=['total_distance'])
    datalist.append(total_distance)

    total_time = route.end_time - route.start_time  # datetime.timedelta
    datalist.append(str(total_time))

    total_hours = total_time.total_seconds() / 3600.0
    avg_speed = total_distance / total_hours
    datalist.append(avg_speed)

    pee_stops = len(route.peeIcon.all())
    poop_stops = len(route.poopIcon.all())
    water_breaks = len(route.drinkIcon.all())
    datalist.append(pee_stops)
    datalist.append(poop_stops)
    datalist.append(water_breaks)

    # TODO: serialize into JSON object but idk if this is the right way to do it
    titles = ['Distance', 'Time',
              'Avg Speed (mph)', 'Pee Stops', 'Poop Drops', 'Water Breaks']
    json_list = []
    for i, title in enumerate(titles):
        data = {
            "id": i,
            "title": title,
            "data": datalist[i]
        }
        json_list.append(data)

    summary_data = {"response": json_list}
    return Response(summary_data)


@api_view(['GET'])
def get_summary_statistics(request):
    # query by time; last week and week before that
    userid = request.user.id
    now = datetime.now()
    now = make_aware(now)
    one_wk_ago = now - timedelta(days=7)
    two_wk_ago = one_wk_ago - timedelta(days=7)
    routes_last_week = Route.objects.filter(
        user=request.user.id, end_time__range=(one_wk_ago, now))
    routes_last_last_week = Route.objects.filter(
        user=request.user.id, end_time__range=(two_wk_ago, one_wk_ago))

    response = GetSummaryStatisticsSerializer(
        routes_last_week, routes_last_last_week)
    return Response(response)

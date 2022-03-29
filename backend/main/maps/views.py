from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from django.shortcuts import get_object_or_404

from .models import Route, Pee, Poop, Drink, Interaction
from user.models import User
from .serializers import RouteSerializer, UpdateRouteSerializer, PeeIconSerializer, PoopIconSerializer, DrinkIconSerializer, InteractionIconSerializer

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

@api_view(['GET'])
def get_summary(request):
    userid = request.user.id
    routes = Route.objects.filter(user=request.user.id)
    route = routes.reverse()[0]

    #TODO: calculate total distance for the first time
    total_distance = route['total_distance']
    total_time = str(route['end_time'] - route['start_time'])
    #TODO: type matching and unit conversions
    avg_speed = total_distance / total_time

    pee_stops = len(routes['peeIcon'])
    poop_stops = len(routes['poopIcon'])
    water_breaks = len(routes['drinkIcon'])

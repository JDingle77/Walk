from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view
from django.shortcuts import get_object_or_404

from .models import Route, Pee, Poop, Drink, Interaction
from .serializers import RouteSerializer, UpdateRouteSerializer, PeeIconSerializer, PoopIconSerializer, DrinkIconSerializer, InteractionIconSerializer

possible_icons = {'pee': [Pee, PeeIconSerializer], 'poop': [Poop, PoopIconSerializer],
                  'drink': [Drink, DrinkIconSerializer], 'interaction': [Interaction, InteractionIconSerializer]}


@api_view(['GET', 'PUT', 'DELETE'])
def handle_route(request, route_id):
    try:
        routes = Route.objects.get(id=route_id)
    except Route.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == "GET":
        serializer = RouteSerializer(routes)
        return Response(serializer.data)

    if request.method == "PUT":
        serializer = UpdateRouteSerializer(routes, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    if request.method == "DELETE":
        operation = routes.delete()
        data = {"isSuccessful": False}
        if operation:
            data["isSuccessful"] = True
        return Response(status=status.HTTP_200_OK, data=data)


@api_view(['POST', 'GET'])
def route(request):
    if request.method == "POST":
        serializer = RouteSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    if request.method == "GET":
        routes = Route.objects.all()
        data = []
        for route in routes:
            serializer = RouteSerializer(route)
            data.append(serializer.data)
        return Response(data)


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

    if request.method == "GET":
        serializer = serializer_name(icon)
        return Response(serializer.data)

    if request.method == "DELETE":
        operation = icon.delete()
        data = {"isSuccessful": False}
        if operation:
            data["isSuccessful"] = True
        return Response(status=status.HTTP_200_OK, data=data)


@api_view(['POST', 'GET'])
def icon(request, icon_name, route_id):
    route = get_object_or_404(Route, id=route_id)

    model_name = None
    serializer_name = None
    icon_name = icon_name.lower()
    if icon_name not in possible_icons:
        return Response("not valid icon type", status=status.HTTP_400_BAD_REQUEST)
    else:
        model_name = possible_icons[icon_name][0]
        serializer_name = possible_icons[icon_name][1]

    if request.method == "POST":
        request.data['route'] = route_id
        print(request.data)
        serializer = serializer_name(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    if request.method == "GET":
        icons = model_name.objects.filter(route=route_id)
        data = []
        for icon in icons:
            serializer = serializer_name(icon)
            data.append(serializer.data)
        return Response(data)

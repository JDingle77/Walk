from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view

from .models import Route
from .serializers import RouteSerializer


@api_view(['GET', 'PUT', 'DELETE'])
def handle_route(request, route_id):
    try:
        routes = Route.objects.get(pk=route_id)
    except Route.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == "GET":
        seralizer = RouteSerializer(routes)
        return Response(seralizer.data)

    if request.method == "PUT":
        serializer = RouteSerializer(routes, data=request.data)
        data = {}
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


@api_view(['POST'])
def create_route(request):
    if request.method == "POST":
        serializer = RouteSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view
from django.shortcuts import get_object_or_404

from .models import User
from .serializers import GetUserSerializer, PostUserSerializer, UpdateUserSerializer


@api_view(['GET', 'PUT'])
def handle_user(request, user_id):
    try:
        user = User.objects.get(id=user_id)
    except User.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == "GET":
        serializer = GetUserSerializer(user)
        return Response(serializer.data)

    if request.method == "DELETE":
        operation = user.delete()
        data = {"isSuccessful": False}
        if operation:
            data["isSuccessful"] = True
        return Response(status=status.HTTP_200_OK, data=data)

    if request.method == "PUT":
        serializer = UpdateUserSerializer(user, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET', 'POST'])
def user(request):
    if request.method == "POST":
        serializer = PostUserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    if request.method == "GET":
        users = User.objects.all()
        data = []
        for user in users:
            serializer = GetUserSerializer(user)
            data.append(serializer.data)
        return Response(data)

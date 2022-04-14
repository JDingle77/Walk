from .models import User, Dog
from rest_framework import serializers


class GetUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        # created and updated are not in the User model yet
        #fields = ['id', 'email', 'is_active', 'created', 'updated']
        #read_only_field = ['is_active', 'created', 'updated']
        fields = ['id', 'email', 'is_active', 'is_staff']
        read_only_field = ['is_active', 'is_staff']


class UpdateUserSerializer(serializers.ModelSerializer):
    email = serializers.CharField(required=False, max_length=255)
    is_active = serializers.BooleanField(required=False, default=True)

    class Meta:
        model = User
        fields = ['id', 'email', 'is_active']


class PostUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'email', 'password']

class DogSerializer(serializers.ModelSerializer):
    # json request field can either not be provided or have an empty value
    breed = serializers.CharField(required=False, allow_blank = True)
    # json request field can either not be provided or have 'null' or valid date
    birthday = serializers.DateTimeField(required=False, allow_null = True)
    class Meta:
        model = Dog
        fields = ['user','username','name','owner_name','breed','gender','birthday','id']
        read_only = ['user']
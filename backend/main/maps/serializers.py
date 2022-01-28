from rest_framework import serializers
from .models import Route, Pee, Poop, Drink, Interaction, Coordinate
import uuid


class CoordinateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Coordinate
        fields = ['id', 'latitude', 'longitude']

# used for creating, getting, and deleting route


class RouteSerializer(serializers.ModelSerializer):
    coordinates = CoordinateSerializer(many=True)

    def create(self, validated_data):
        coordinates = validated_data.pop("coordinates")
        route = Route.objects.create(**validated_data)
        for coordinate_data in coordinates:
            Coordinate.objects.create(**coordinate_data, route=route)
        return route

    class Meta:
        model = Route
        fields = ['route_name', 'id', 'user',
                  'coordinates', 'start_time', 'end_time']
        read_only = ['user', 'start_time', 'end_time']

# use to update route


class UpdateRouteSerializer(serializers.ModelSerializer):
    route_name = serializers.CharField(required=False)

    class Meta:
        model = Route
        fields = ['route_name']


class PeeIconSerializer(serializers.ModelSerializer):
    class Meta:
        model = Pee
        fields = ['id', 'pee_latitude', 'pee_longitude', 'route']


class PoopIconSerializer(serializers.ModelSerializer):
    class Meta:
        model = Poop
        fields = ['id', 'poop_latitude', 'poop_longitude', 'route']


class DrinkIconSerializer(serializers.ModelSerializer):
    class Meta:
        model = Drink
        fields = ['id', 'drink_latitude', 'drink_longitude', 'route']


class InteractionIconSerializer(serializers.ModelSerializer):
    class Meta:
        model = Interaction
        fields = ['id', 'interaction_latitude',
                  'interaction_longitude', 'route']

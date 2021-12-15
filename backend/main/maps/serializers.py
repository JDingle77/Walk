from rest_framework import serializers
from .models import Route, Pee, Poop, Drink, Interaction
import uuid


class RouteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Route
        fields = ['route_name', 'start_latitude', 'start_longitude', 'id']


class UpdateRouteSerializer(serializers.ModelSerializer):
    route_name = serializers.CharField(required=False)
    start_latitude = serializers.DecimalField(
        required=False, max_digits=50, decimal_places=49)
    start_longitude = serializers.DecimalField(
        required=False, max_digits=50, decimal_places=49)

    class Meta:
        model = Route
        fields = ['route_name', 'start_longitude', 'start_latitude']


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

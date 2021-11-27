from rest_framework import serializers
from .models import Route


class RouteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Route
        fields = ['route_name', 'start_latitude', 'start_longitude']

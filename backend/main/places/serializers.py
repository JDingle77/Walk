from rest_framework import serializers
from .models import Restaurant
import uuid


class RestaurantSerializer(serializers.ModelSerializer):
    class Meta:
        model = Restaurant
        fields = "__all__"

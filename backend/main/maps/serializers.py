from rest_framework import serializers
from .models import Route, Pee, Poop, Drink, Interaction, Coordinate
import uuid
from datetime import timedelta


class CoordinateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Coordinate
        fields = ['id', 'latitude', 'longitude']


class PeeIconSerializer(serializers.ModelSerializer):
    class Meta:
        model = Pee
        fields = ['id', 'pee_latitude', 'pee_longitude']


class PoopIconSerializer(serializers.ModelSerializer):
    class Meta:
        model = Poop
        fields = ['id', 'poop_latitude', 'poop_longitude']


class DrinkIconSerializer(serializers.ModelSerializer):
    class Meta:
        model = Drink
        fields = ['id', 'drink_latitude', 'drink_longitude']


class InteractionIconSerializer(serializers.ModelSerializer):
    class Meta:
        model = Interaction
        fields = ['id', 'interaction_latitude',
                  'interaction_longitude']


# used for creating, getting, and deleting route


class RouteSerializer(serializers.ModelSerializer):
    coordinates = CoordinateSerializer(many=True)
    peeIcon = PeeIconSerializer(many=True)
    poopIcon = PoopIconSerializer(many=True)
    drinkIcon = DrinkIconSerializer(many=True)
    interactionIcon = InteractionIconSerializer(many=True)

    def create(self, validated_data):
        coordinates = validated_data.pop("coordinates")
        peeIcon = validated_data.pop("peeIcon")
        poopIcon = validated_data.pop("poopIcon")
        drinkIcon = validated_data.pop('drinkIcon')
        interactionIcon = validated_data.pop('interactionIcon')

        route = Route.objects.create(**validated_data)
        for coordinate_data in coordinates:
            Coordinate.objects.create(**coordinate_data, route=route)
        for peeIcon_data in peeIcon:
            Pee.objects.create(**peeIcon_data, route=route)
        for poopIcon_data in poopIcon:
            Poop.objects.create(**poopIcon_data, route=route)
        for drinkIcon_data in drinkIcon:
            Drink.objects.create(**drinkIcon_data, route=route)
        for interactionIcon_data in interactionIcon:
            Interaction.objects.create(**interactionIcon_data, route=route)

        return route

    class Meta:
        model = Route
        fields = ['route_name', 'id', 'user',
                  'coordinates', 'start_time', 'end_time', 'total_distance', 'peeIcon', 'poopIcon', 'drinkIcon', 'interactionIcon']
        read_only = ['user', 'start_time', 'end_time']

# use to update route


class UpdateRouteSerializer(serializers.ModelSerializer):
    route_name = serializers.CharField(required=False)

    class Meta:
        model = Route
        fields = ['route_name']


def GetSummaryStatisticsSerializer(routes_last_week, routes_last_last_week):
    # calculate:
    tt_dist_last = 0
    tt_time_last = timedelta(minutes=0)
    n_routes_last = 0
    for route in routes_last_week:
        tt_dist_last += route.total_distance
        tt_time_last += (route.end_time - route.start_time)
        n_routes_last += 1

    if_routes_last_week = False if n_routes_last == 0 else True

    tt_dist_last2 = 0
    tt_time_last2 = timedelta(minutes=0)
    n_routes_last2 = 0
    for route in routes_last_last_week:
        tt_dist_last2 += route.total_distance
        tt_time_last2 += (route.end_time - route.start_time)
        n_routes_last2 += 1

    if_routes_last_week2 = False if n_routes_last2 == 0 else True

    # average dist, time
    if n_routes_last != 0:
        avg_dist_last = tt_dist_last / n_routes_last
        avg_time_last = tt_time_last / n_routes_last
    else:
        avg_dist_last = 0
        avg_time_last = 0
        
    if n_routes_last2 != 0:
        avg_dist_last2 = tt_dist_last2 / n_routes_last2
        avg_time_last2 = tt_time_last2 / n_routes_last2
    else:
        avg_dist_last2 = 0
        avg_time_last2 = 0

    # percent change distance, time
    if n_routes_last != 0 and n_routes_last2 != 0:
        change_dist = ((avg_dist_last - avg_dist_last2) / avg_dist_last2 * 100)
        change_time = ((avg_time_last - avg_time_last2) / avg_time_last2 * 100)
    else:
        change_dist = 0
        change_time = 0

    response = {
        "avg_dist": round(avg_dist_last+0.0049, 2),
        "avg_time": str(avg_time_last).split('.')[0],
        "change_dist": round(change_dist+0.0049, 2),
        "change_time": round(change_time+0.0049, 2),
        "routes_last_week": if_routes_last_week,
        "routes_last_week2": if_routes_last_week2,
    }

    return response

from os import name
from django.db import models
import uuid

from user.models import User

# TODO::add time fields (start and end time)


class Route(models.Model):
    route_name = models.CharField(max_length=50)
    start_time = models.DateTimeField()
    end_time = models.DateTimeField()
    total_distance = models.FloatField() #i just realized that adding this is a lot more difficult than I initially thought since i need to do some serializer modifications too
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.ForeignKey(User, on_delete=models.CASCADE, default=None)

    def __str__(self):
        return self.route_name


class Coordinate(models.Model):
    route = models.ForeignKey(
        Route, related_name="coordinates", on_delete=models.CASCADE)
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    latitude = models.DecimalField(max_digits=9, decimal_places=6)
    longitude = models.DecimalField(max_digits=9, decimal_places=6)

    def __str__(self):
        return f'{self.latitude}, {self.longitude}'


class Pee(models.Model):
    route = models.ForeignKey(
        Route, related_name="peeIcon",  on_delete=models.CASCADE)
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    pee_latitude = models.DecimalField(max_digits=9, decimal_places=6)
    pee_longitude = models.DecimalField(max_digits=9, decimal_places=6)

    def _str_(self):
        return f'{self.pee_latitude}, {self.pee_longitude}'


class Poop(models.Model):
    route = models.ForeignKey(
        Route, related_name="poopIcon", on_delete=models.CASCADE)
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    poop_latitude = models.DecimalField(max_digits=9, decimal_places=6)
    poop_longitude = models.DecimalField(
        max_digits=9, decimal_places=6)

    def _str_(self):
        return f'{self.poo_latitude}, {self.poo_longitude}'


class Drink(models.Model):
    route = models.ForeignKey(
        Route, related_name="drinkIcon", on_delete=models.CASCADE)
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    drink_latitude = models.DecimalField(max_digits=9, decimal_places=6)
    drink_longitude = models.DecimalField(
        max_digits=9, decimal_places=6)

    def _str_(self):
        return f'{self.drink_latitude}, {self.drink_longitude}'


class Interaction(models.Model):
    route = models.ForeignKey(
        Route, related_name="interactionIcon", on_delete=models.CASCADE)
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    interaction_latitude = models.DecimalField(max_digits=9, decimal_places=6)
    interaction_longitude = models.DecimalField(
        max_digits=9, decimal_places=6)

    def _str_(self):
        return f'{self.interaction_latitude}, {self.interaction_longitude}'

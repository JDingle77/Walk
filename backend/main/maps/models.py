from django.db import models
import uuid


class Route(models.Model):
    route_name = models.CharField(max_length=50)
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    start_latitude = models.DecimalField(max_digits=9, decimal_places=6)
    start_longitude = models.DecimalField(max_digits=9, decimal_places=6)

    def __str__(self):
        return self.route_name


class Pee(models.Model):
    route = models.ForeignKey(Route, on_delete=models.CASCADE)
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    pee_latitude = models.DecimalField(max_digits=9, decimal_places=6)
    pee_longitude = models.DecimalField(max_digits=9, decimal_places=6)

    def _str_(self):
        return (self.pee_latitude, self.pee_longitude)


class Poop(models.Model):
    route = models.ForeignKey(Route, on_delete=models.CASCADE)
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    poop_latitude = models.DecimalField(max_digits=9, decimal_places=6)
    poop_longitude = models.DecimalField(
        max_digits=9, decimal_places=6)

    def _str_(self):
        return (self.poo_latitude, self.poo_longitude)


class Drink(models.Model):
    route = models.ForeignKey(Route, on_delete=models.CASCADE)
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    drink_latitude = models.DecimalField(max_digits=9, decimal_places=6)
    drink_longitude = models.DecimalField(
        max_digits=9, decimal_places=6)

    def _str_(self):
        return (self.drink_latitude, self.drink_longitude)


class Interaction(models.Model):
    route = models.ForeignKey(Route, on_delete=models.CASCADE)
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    interaction_latitude = models.DecimalField(max_digits=9, decimal_places=6)
    interaction_longitude = models.DecimalField(
        max_digits=9, decimal_places=6)

    def _str_(self):
        return (self.interaction_latitude, self.interaction_longitude)

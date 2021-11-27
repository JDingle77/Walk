from django.db import models


class Route(models.Model):
    route_name = models.CharField(max_length=50)
    start_latitude = models.DecimalField(max_digits=9, decimal_places=6)
    start_longitude = models.DecimalField(max_digits=9, decimal_places=6)

    def __str__(self):
        return self.route_name


class Pee(models.Model):
    route = models.ForeignKey(Route, on_delete=models.CASCADE)
    pee_latitude = models.DecimalField(max_digits=9, decimal_places=6)
    pee_longitude = models.DecimalField(max_digits=9, decimal_places=6)

    def _str_(self):
        return (self.pee_latitude, self.pee_longitude)


class Poop(models.Model):
    route = models.ForeignKey(Route, on_delete=models.CASCADE)
    poo_latitude = models.DecimalField(max_digits=9, decimal_places=6)
    poo_longitude = models.DecimalField(
        max_digits=9, decimal_places=6)

    def _str_(self):
        return (self.poo_latitude, self.poo_longitude)


class Drink(models.Model):
    route = models.ForeignKey(Route, on_delete=models.CASCADE)
    drink_latitude = models.DecimalField(max_digits=9, decimal_places=6)
    drink_longitude = models.DecimalField(
        max_digits=9, decimal_places=6)

    def _str_(self):
        return (self.drink_latitude, self.drink_longitude)


class Interaction(models.Model):
    route = models.ForeignKey(Route, on_delete=models.CASCADE)
    interaction_latitude = models.DecimalField(max_digits=9, decimal_places=6)
    interaction_longitude = models.DecimalField(
        max_digits=9, decimal_places=6)

    def _str_(self):
        return (self.interaction_latitude, self.interaction_longitude)

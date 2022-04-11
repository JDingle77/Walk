from django.db import models

#Ignore for now, not sure if we are using models / database for places
class Restaurant(models.Model):
    yelp_id = models.CharField(primary_key=True,max_length=50)
    yelp_link = models.URLField()
    res_name = models.CharField(max_length=50)
    is_closed = models.BooleanField()
    desc = models.CharField(max_length=50)


    rating = models.DecimalField(max_digits=2, decimal_places=1)
    review_count = models.IntegerField()

    phone = models.CharField(max_length=50)
    address = models.CharField(max_length=100)
    zipcode = models.IntegerField()

    long = models.DecimalField(max_digits=9, decimal_places=6)
    lat = models.DecimalField(max_digits=9, decimal_places=6)
    distance_m = models.DecimalField(max_digits=9, decimal_places=6)

    def __str__(self):
        return self.res_name

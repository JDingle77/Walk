from django.urls import path
import uuid

from . import views

urlpatterns = [
     #pattern 
    path('restaurants', views.search_restaurants),
    path('parks', views.search_parks),
]

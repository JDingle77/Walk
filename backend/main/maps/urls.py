from django.contrib import admin
from django.urls import path

from . import views

urlpatterns = [
    path('route/<int:route_id>/', views.handle_route, name="handle_route"),
    path('create_route/',
         views.create_route, name="create_route"),
]

from django.contrib import admin
from django.urls import path
import uuid

from . import views

urlpatterns = [
    path('route/<uuid:route_id>/', views.handle_route, name="specific_route"),
    path('route/',
         views.route, name="route"),
    path('specific_icon/<str:icon_name>/<uuid:icon_id>/',
         views.handle_icon, name="specific_icon"),
    path('icon/<str:icon_name>/<uuid:route_id>/',
         views.icon, name="icon"),
]

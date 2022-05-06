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
    path('all_icons/<uuid:route_id>/', views.get_all_icons, name="get_all_icons"),
    path('get_summary/', views.get_summary, name="get_summary"),
    path('get_summary_statistics/', views.get_summary_statistics, name="get_summary_statistics")
]

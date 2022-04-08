from django.urls import path
import uuid

from . import views

urlpatterns = [
    path('', views.user, name="all_users"),
    path('<uuid:user_id>/', views.handle_user, name="get_user"),
    path('dogProfile/', views.dog, name ="get_dog_profile")
]

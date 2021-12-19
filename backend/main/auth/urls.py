from rest_framework.routers import SimpleRouter
from .views import LoginViewSet, RegistrationViewSet, RefreshViewSet
from django.urls import path

routes = SimpleRouter()  # Use SimpleRouter to create url patterns for class-based views

routes.register(r'login', LoginViewSet, basename="auth-login"),
routes.register(r'register', RegistrationViewSet, basename="auth-register")
routes.register(r'refresh', RefreshViewSet, basename="auth-refresh")

urlpatterns = [*routes.urls]

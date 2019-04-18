from django.urls import path
from . import views
from . import models
urlpatterns = [
    path('api/restaurants/', views.restaurants ),
    path('api/restaurants/email', views.restaurant_data_by_email ),
    path('api/restaurants/name', views.restaurant_data_by_name ),
    path('api/restaurants/password', views.restaurant_password)
]
from django.shortcuts import render
from restaurants.models import Restaurant
from restaurants.serializers import RestaurantSerializer
from rest_framework import generics
class RestaurantListCreate(generics.ListCreateAPIView):
    queryset = Restaurant.objects.all()
    serializer_class = RestaurantSerializer

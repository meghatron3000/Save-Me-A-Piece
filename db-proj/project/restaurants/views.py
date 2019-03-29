from django.shortcuts import render
from restaurants.models import Restaurant, loginR_raw_sql_query, ChangePasswordR_raw_sql_query, CreateR_raw_sql_query
from restaurants.serializers import RestaurantSerializer
from rest_framework import generics
from rest_framework.decorators import detail_route, list_route
from rest_framework.response import Response
from rest_framework import viewsets, status

class RestaurantListCreate(generics.ListCreateAPIView):
    queryset = Restaurant.objects.all()
    serializer_class = RestaurantSerializer

from django.http import Http404
from django.shortcuts import render
from  .models import my_custom_sql

def index(request):
    all_restaurants = my_custom_sql()
    return render(request, 'index.html',{ 'all_restaurants' :all_restaurants})

def login(request):
    email = request.email
    password = request.password

    sucess = loginR_raw_sql_query(email = email, password = password);
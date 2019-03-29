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
# def index (request):
#     all_restaurants = my_custom_sql(self)
#     return  render(request,'index.html',{ 'all_restaurants' :all_restaurants})

    # @list_route(methods=['get'])
    # def raw_sql_query(self, request):
    # 	email = request.query_params.get('email', None)
    # 	password = request.query_params.get('password', None)

    # 	restaurant = loginN_raw_sql_query(email = email, password = password)
    # 	serializer = RestaurantSerializer(restaurant, many=True)
    # 	return Response(serializer.data, status=status.HTTP_200_OK)


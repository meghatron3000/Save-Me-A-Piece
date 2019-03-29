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

    @list_route(methods=['get'])
    def raw_sql_query(self, request):
    	email = request.query_params.get('email', None)
    	password = request.query_params.get('password', None)

    	restaurant = loginN_raw_sql_query(email = email, password = password)
    	serializer = RestaurantSerializer(restaurant, many=True)
    	return Response(serializer.data, status=status.HTTP_200_OK)


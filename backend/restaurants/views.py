from django.shortcuts import render
from restaurants.models import Restaurant
from restaurants.serializers import RestaurantSerializer
from rest_framework import generics
from rest_framework.decorators import detail_route, list_route, api_view
from rest_framework.response import Response
from rest_framework import viewsets, status
from django.http import JsonResponse
from django.db import connection
from django.views.decorators.csrf import csrf_exempt
import psycopg2
import pprint
import json
import datetime
class RestaurantListCreate(generics.ListCreateAPIView):
    queryset = Restaurant.objects.all()
    serializer_class = RestaurantSerializer

from django.http import Http404
from django.shortcuts import render

@api_view(['GET']) #login restaurant
def restaurants(request, format=None):
    email = request.GET.get('email', '')
    password = request.GET.get('password', '')

    cursor = connection.cursor()
    cursor.execute('SELECT * FROM restaurants WHERE password = %s AND email = %s', [password, email])
    restaurant = cursor.fetchall()

    if len(restaurant) == 0:
        return JsonResponse({
            'message': "NOT FOUND",
            'data': None
        })
    else:
        return JsonResponse({
            'message': "SUCCESS",
            'data': restaurant
        })

@csrf_exempt 
@api_view(['POST']) #register a restaurant
def restaurants(request, format=None):
    body_unicode = request.body.decode('utf-8')
    body = json.loads(body_unicode)

    cursor = connection.cursor()
    cursor.execute('INSERT INTO restaurants ("email", "password", "name", "address", "phone_number", "zip_code", "rating", "city", "state") VALUES(%s, %s, %s, %s, %s, %s, %s, %s) ', [body["email"], body["password"], body["name"], body["address"], body["phone"], body["zip_code"], str(0), body["city"], body["state"]])

    return JsonResponse({
        'message': "SUCCESS"
    })


@csrf_exempt 
@api_view(['DELETE']) #unregister a restaurant
def restaurants(request, format=None):
    email = request.GET.get('email', '')

    cursor = connection.cursor()
    cursor.execute("DELETE FROM restaurants WHERE email = %s", [email])

    return JsonResponse({
        'message': "SUCCESS"
    })


@csrf_exempt 
@api_view(['PUT']) #edit restaurant data
def restaurants(request, format=None):
    body_unicode = request.body.decode('utf-8')
    body = json.loads(body_unicode)

    cursor = connection.cursor()
    cursor.execute('UPDATE restaurants SET email = %s, password = %s, name = %s, address = %s, phone_number = %s, zip_code = %s, rating = %s, city = %s, state = %s WHERE email = %s', [body["email"], body["password"], body["name"], body["address"], body["phone"], body["zip_code"], str(0), body["city"], body["state"], body["email"]])
    
    return JsonResponse({
        'message': "SUCCESS"
    })

@api_view(['PUT']) #replace password
def change_password(request):
    body_unicode = request.body.decode('utf-8')
    body = json.loads(body_unicode)
    email = body["email"]
    new_password = body["newPassword"]

    cursor = connection.cursor()
    cursor.execute("UPDATE restaurants SET password = %s WHERE email = %s", [new_password, email])

    return JsonResponse({
        'message': "SUCCESS"
    })

@api_view(['GET']) #getting restaurant data by email
def get_data_by_email(request): 
    email = request.GET.get('email', '')

    cursor = connection.cursor()
    cursor.execute("SELECT name, phone_number, address, city, state, zip_code  FROM restaurants WHERE email = %s", [email])
    restaurant_data = cursor.fetchall()

    if len(restaurant_data) == 0:
        return JsonResponse({
            'message': "NOT FOUND",
            'data': None
        })
    else:
        return JsonResponse({
            'message': "SUCCESS",
            'data': restaurant_data
        })
    return JsonResponse(success, safe=False)

@api_view(['GET']) #getting restaurants data by name
def get_data_by_name(request): 
    name = request.GET.get('name', '')

    cursor = connection.cursor()
    cursor.execute("SELECT name, phone_number, address, city, state, zip_code  FROM restaurants WHERE name = %s", [name])
    restaurant_data = cursor.fetchall()

    if len(restaurant_data) == 0:
        return JsonResponse({
            'message': "NOT FOUND",
            'data': None
        })
    else:
        return JsonResponse({
            'message': "SUCCESS",
            'data': restaurant_data
        })
    return JsonResponse(success, safe=False)

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
from  .models import forgot_passRes, mysearch, get_res

@api_view(['GET']) #login restaurant
def restaurants(request, format=None):
    email = request.GET.get('email', '')
    password = request.GET.get('password', '')

    cursor = connection.cursor()
    cursor.execute('SELECT * FROM restaurants WHERE password = %s AND email = %s', [password, email])
    restaurant = cursor.fetchall()
    pprint.pprint(data)

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

def forgotpassR(request):
    e = request.GET.get('email', '')
    p = request.GET.get('newpass', '')
    print(request, e, p)
    success = forgot_passRes(e, p)
    print(success)
    return JsonResponse(success, safe=False)

def find_res(request):
    print(request)
    e = request.GET.get('email', '')
    success = get_res(e)
    return JsonResponse(success, safe=False)


def showSearch(request):
    name = request.GET.get('name', '')
    print(request)
    found = mysearch(name)
    return render(request, 'search.html',{ 'name' :name})
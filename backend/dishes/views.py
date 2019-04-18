from django.shortcuts import render
from restaurants.models import Restaurant
from restaurants.serializers import RestaurantSerializer
from rest_framework import generics
from rest_framework.decorators import detail_route, list_route, api_view
from rest_framework.response import Response
from rest_framework import viewsets, status
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.db import connection
import psycopg2
import pprint
import json
import datetime
from django.http import Http404
from django.shortcuts import render
from  .models import  get_dishes, register_dish, delete_dish

@csrf_exempt 
@api_view(['GET', 'POST', 'DELETE']) 
def dishes(request, format=None):
    if request.method == 'POST': #register nonprofit
        body_unicode = request.body.decode('utf-8')
        body = json.loads(body_unicode)

        cursor = connection.cursor()
        cursor.execute('INSERT INTO dishes ("restaurant_email", "restaurant_name", "name", "price", "servings") VALUES( %s, %s, %s, %s, %s)' , [ body["restaurant_email"],  body["restaurant_name"], body["name"], body["price"], body["servings"] ])
        
        return JsonResponse({
            'message': "SUCCESS"
        })
    elif request.method == 'DELETE': #delete a dish by name and restaurant email
        restaurant_email = request.GET.get('restaurant_email', '')
        name = request.GET.get('name', '')

        cursor = connection.cursor()
        cursor.execute("DELETE FROM dishes WHERE name = %s AND restaurant_email = %s", [name, restaurant_email])
        
        return JsonResponse({
            'message': "SUCCESS"
        })
    else: #get a dish based off of restaurant email
        restaurant_email = request.GET.get('restaurant_email', '')

        cursor = connection.cursor()
        cursor.execute("SELECT * FROM dishes WHERE restaurant_email = %s", [restaurant_email])
        dish = cursor.fetchall()

        if len(dish) == 0:
            return JsonResponse({
                'message': "NOT FOUND",
                'result': None
            })
        else:
            return JsonResponse({
                'message': "SUCCESS",
                'result': dish
            })


def get_price(time, price):
    print(request)
    e = time
    p = price
    currPrice = float('0' + p)
    print(e.split(':'))
    split = e.split(':')
    hour = int('0' + datetime.datetime.now().strftime('%H')) * 60  #  Time like '23:12:05'
    minute = int('0' + datetime.datetime.now().strftime('%M'))  #  Time like '23:12:05'
    total_min = hour + minute
    given_hour = int('0' + split[0]) * 60
    print(split[0])
    given_min = int('0' + split[1])
    print(split[1])
    decrement = ((total_min - (given_hour+given_min))/60) * (currPrice*.05)

    print(decrement)

    return JsonResponse(str(currPrice+decrement), safe=False)

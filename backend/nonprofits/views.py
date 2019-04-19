from django.shortcuts import render
from restaurants.models import Restaurant
from restaurants.serializers import RestaurantSerializer
from rest_framework import generics
from rest_framework.decorators import detail_route, list_route, api_view
from rest_framework.response import Response
from rest_framework import viewsets, status
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json
import datetime
from django.http import Http404
from django.shortcuts import render
from django.db import connection
import pprint

@csrf_exempt 
@api_view(['GET', 'POST', 'DELETE']) 
def nonprofits(request, format=None):
    if request.method == 'POST': #register nonprofit
        body_unicode = request.body.decode('utf-8')
        body = json.loads(body_unicode)

        cursor = connection.cursor()
        cursor.execute('INSERT INTO nonprofits ("email", "password", "name", "address", "phone_number", "zip_code", "rating", "city", "state") VALUES( %s, %s, %s, %s, %s, %s, %s, %s, %s)' , [ body["email"],  body["password"], body["name"], body["address"], body["phone"], body["zip_code"], 0, body["city"], body["state"] ])
        
        return JsonResponse({
            'message': "SUCCESS"
        })
    elif request.method == 'DELETE': #unregister nonprofits
        email = request.GET.get('email', '')

        cursor = connection.cursor()
        cursor.execute("DELETE FROM nonprofits WHERE email = %s", [email])

        return JsonResponse({
            'message': "SUCCESS"
        })
    else: #login nonprofit
        email = request.GET.get('email', '')
        password = request.GET.get('password', '')

        cursor = connection.cursor()
        cursor.execute('SELECT * FROM nonprofits WHERE email = %s AND password = %s', [email, password] )
        nonprofit = cursor.fetchall()

        if len(nonprofit) == 0:
            return JsonResponse({
                'message': "NOT FOUND",
                'result': None
            })
        else:
            return JsonResponse({
                'message': "SUCCESS",
                'result': nonprofit
            })

@api_view(['GET']) #getting nonprofits data by email
def get_data_by_email(request): 
    email = request.GET.get('email', '')

    cursor = connection.cursor()
    cursor.execute("SELECT name, phone_number, address, city, state, zip_code  FROM nonprofits WHERE email = %s", [email])
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


@api_view(['PUT']) #replace password
def change_password(request):
    body_unicode = request.body.decode('utf-8')
    body = json.loads(body_unicode)
    email = body["email"]
    new_password = body["newPassword"]

    cursor = connection.cursor()
    cursor.execute("UPDATE nonprofits SET password = %s WHERE email = %s", [new_password, email])

    return JsonResponse({
        'message': "SUCCESS"
    })

@api_view(['GET']) #replace password
def overbudget_rests_near(request):
    zip_code = request.GET.get('zip_code', '')
    city = request.GET.get('city', '')
    price = request.GET.get('price', '')
    cursor = connection.cursor()
    cursor.execute("SELECT * FROM dishes INNER JOIN restaurants on restaurants.email=dishes.restaurant_email WHERE price > %s AND (zip_code = %s OR city= %s);", [price, zip_code, city])
    res = cursor.fetchall()
    return JsonResponse({
        'message': "SUCCESS",
        'result': res
    })

@api_view(['GET']) #replace password
def underbudget_rests_near(request):
    zip_code = request.GET.get('zip_code', '')
    city = request.GET.get('city', '')
    price = request.GET.get('price', '')
    cursor = connection.cursor()
    cursor.execute("SELECT * FROM dishes INNER JOIN restaurants on restaurants.email=dishes.restaurant_email WHERE price <= %s AND (zip_code = %s OR city= %s);", [price, zip_code, city])
    res = cursor.fetchall()
    return JsonResponse({
        'message': "SUCCESS",
        'result': res
    })

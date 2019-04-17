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
from  .models import my_custom_sql, forgot_passNon, forgot_passRes,unsubNon,unsubRes, registerNon, registerRes, loginRes, loginNon, mysearch, get_dishes, get_nonp, get_res, register_dish

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
    print(body)
    cursor = connection.cursor()
    cursor.execute('INSERT INTO restaurants ("email", "password", "name", "address", "phone_number", "zip_code", "rating", "city") VALUES(%s, %s, %s, %s, %s, %s, %s, %s) ', [body["email"], body["password"], body["name"], body["address"], body["phone"], body["zip_code"], str(0), body["city"]])

    return JsonResponse({
        'message': "SUCCESS"
    })

def index(request):
    all_restaurants = my_custom_sql()
    # return render(request, 'index.html',{ 'all_restaurants' :all_restaurants})
    return JsonResponse(all_restaurants, safe=False)

def loginR(request):
    print(request)
    e = request.GET.get('email', '')
    p = request.GET.get('password', '')
    success = loginRes(e, p)
    return JsonResponse(success, safe=False)
    # return render(request, 'login.html',{ 'email' :e, 'password':p})
def loginN(request):
    print(request)
    e = request.GET.get('email', '')
    p = request.GET.get('password', '')
    success = loginNon(e, p)
    return JsonResponse(success, safe=False)
    # return render(request, 'login.html',{ 'email' :e, 'password':p})

def forgotpassR(request):
    e = request.GET.get('email', '')
    p = request.GET.get('newpass', '')
    print(request, e, p)
    success = forgot_passRes(e, p)
    print(success)
    return JsonResponse(success, safe=False)

def forgotpassN(request):
    e = request.GET.get('email', '')
    p = request.GET.get('newpass', '')
    print(request, e, p)
    success = forgot_passNon(e, p)
    print(success)
    return JsonResponse(success, safe=False)

def unsubscribeN(request):
    e = request.GET.get('email', '')
    print(request, e)
    success = unsubNon(e)
    print(success)
    return JsonResponse(success, safe=False)

def unsubscribeR(request):
    e = request.GET.get('email', '')
    print(request, e)
    success = unsubRes(e)
    print(success)
    return JsonResponse(success, safe=False)

def unsubscribe_dish(request):
    n = request.GET.get('name', '')
    e = request.GET.get('restuarant_email', '')
    print(request, e)
    success = delete_dish(n, e)
    print(success)
    return JsonResponse(success, safe=False)

@csrf_exempt 
def registernewR(request):
    body_unicode = request.body.decode('utf-8')
    body = json.loads(body_unicode)
    print(body)
    e = body["email"]
    p = body["password"]
    a = body["address"]
    p_no = body["phone"]
    name = body["name"]
    z = body["zip_code"]
    c = body["city"]
    print(request, e, p, a, p_no, name, c)
    success = registerRes(e, p, a, name, p_no, z, c)
    return JsonResponse(success, safe=False)
@csrf_exempt 
def registernewN(request):
    body_unicode = request.body.decode('utf-8')
    body = json.loads(body_unicode)
    print(body)
    e = body["email"]
    p = body["password"]
    a = body["address"]
    p_no = body["phone"]
    name = body["name"]
    z = body["zip_code"]
    print(request, e, p, a, p_no, name)
    success = registerNon(e, p, a, name, p_no, z)
    return JsonResponse(success, safe=False)

@csrf_exempt 
def registernew_dish(request):
    body_unicode = request.body.decode('utf-8')
    body = json.loads(body_unicode)
    print(body)
    e = body["restuarant_email"]
    en = body["restuarant_name"]
    n = body["name"]
    p = body["price"]
    lt = datetime.datetime.now().strftime('%H:%M:%S');
    print(lt)
    print(e, en, n, p, lt)
    success = register_dish(e, en, n, p, lt)
    return JsonResponse(success, safe=False)

def showSearch(request):
    name = request.GET.get('name', '')
    print(request)
    found = mysearch(name)
    return render(request, 'search.html',{ 'name' :name})

def find_res(request):
    print(request)
    e = request.GET.get('email', '')
    success = get_res(e)
    return JsonResponse(success, safe=False)

def find_nonP(request):
    print(request)
    e = request.GET.get('email', '')
    success = get_nonp(e)
    return JsonResponse(success, safe=False)

def find_dishes(request):
    print(request)
    e = request.GET.get('restuarant_email', '')
    n = request.GET.get('restuarant_name', '')
    success = get_dishes(e, n)
    return JsonResponse(success, safe=False)

def get_price(request):
    print(request)
    e = request.GET.get('time', '')
    p = request.GET.get('price', '')
    price = float('0' + p)
    print(e.split(':'))
    split = e.split(':')
    hour = int('0' + datetime.datetime.now().strftime('%H')) * 60  #  Time like '23:12:05'
    minute = int('0' + datetime.datetime.now().strftime('%M'))  #  Time like '23:12:05'
    total_min = hour + minute
    given_hour = int('0' + split[0]) * 60
    print(split[0])
    given_min = int('0' + split[1])
    print(split[1])
    decrement = ((total_min - (given_hour+given_min))/60) * (price*.05)

    print(decrement)

    # print(now-e)
    return JsonResponse(str(price+decrement), safe=False)

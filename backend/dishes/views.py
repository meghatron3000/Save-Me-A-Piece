from django.shortcuts import render
from restaurants.models import Restaurant
from restaurants.serializers import RestaurantSerializer
from rest_framework import generics
from rest_framework.decorators import detail_route, list_route
from rest_framework.response import Response
from rest_framework import viewsets, status
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json
import datetime
from django.http import Http404
from django.shortcuts import render
from  .models import  get_dishes, register_dish, delete_dish

def unsubscribe_dish(request):
    n = request.GET.get('name', '')
    e = request.GET.get('restuarant_email', '')
    print(request, e)
    sucess = delete_dish(n, e)
    print(sucess)
    return JsonResponse(sucess, safe=False)

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
    sucess = register_dish(e, en, n, p, lt)
    return JsonResponse(sucess, safe=False)

def find_dishes(request):
    print(request)
    e = request.GET.get('restuarant_email', '')
    n = request.GET.get('restuarant_name', '')
    sucess = get_dishes(e, n)
    return JsonResponse(sucess, safe=False)

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

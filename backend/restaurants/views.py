from django.shortcuts import render
from restaurants.models import Restaurant, loginR_raw_sql_query
from restaurants.serializers import RestaurantSerializer
from rest_framework import generics
from rest_framework.decorators import detail_route, list_route
from rest_framework.response import Response
from rest_framework import viewsets, status
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json

class RestaurantListCreate(generics.ListCreateAPIView):
    queryset = Restaurant.objects.all()
    serializer_class = RestaurantSerializer

from django.http import Http404
from django.shortcuts import render
from  .models import my_custom_sql, forgot_pass, unsub, register, mysearch

def index(request):
    all_restaurants = my_custom_sql()
    # return render(request, 'index.html',{ 'all_restaurants' :all_restaurants})
    return JsonResponse(all_restaurants, safe=False)

def login(request):
    print(request)
    e = request.GET.get('email', '')
    p = request.GET.get('password', '')
    t = request.GET.get('table', '')
    sucess = loginR_raw_sql_query(e, p, t)
    return JsonResponse(sucess, safe=False)
    # return render(request, 'login.html',{ 'email' :e, 'password':p})

def forgotpass(request):
    e = request.GET.get('email', '')
    p = request.GET.get('newpass', '')
    print(request, e, p)
    t = request.GET.get('table', '')
    sucess = forgot_pass(e, p, t)
    print(sucess)
    return JsonResponse(sucess, safe=False)

def unsubscribe(request):
    e = request.GET.get('email', '')
    print(request, e)
    t = request.GET.get('table', '')
    sucess = unsub(e, t)
    print(sucess)
    return JsonResponse(sucess, safe=False)

@csrf_exempt 
def registernew(request):
    body_unicode = request.body.decode('utf-8')
    body = json.loads(body_unicode)
    print(body)
    e = body["email"]
    p = body["password"]
    a = body["address"]
    p_no = body["phone"]
    name = body["name"]
    t = body["table"]
    print(request, e, p, a, p_no, name)
    sucess = register(e, p, a, name, p_no, t)
    return JsonResponse(sucess, safe=False)

def showSearch(request):
    name = request.GET.get('name', '')
    t = request.GET.get('table', '')
    print(request)
    found = mysearch(name, t)
    return render(request, 'search.html',{ 'name' :name})

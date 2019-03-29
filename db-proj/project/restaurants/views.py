from django.shortcuts import render
from restaurants.models import Restaurant, loginR_raw_sql_query
from restaurants.serializers import RestaurantSerializer
from rest_framework import generics
from rest_framework.decorators import detail_route, list_route
from rest_framework.response import Response
from rest_framework import viewsets, status
from django.http import JsonResponse

class RestaurantListCreate(generics.ListCreateAPIView):
    queryset = Restaurant.objects.all()
    serializer_class = RestaurantSerializer

from django.http import Http404
from django.shortcuts import render
from  .models import my_custom_sql, forgot_pass, unsub, register

def index(request):
    all_restaurants = my_custom_sql()
    # return render(request, 'index.html',{ 'all_restaurants' :all_restaurants})
    return JsonResponse(all_restaurants, safe=False)

def login(request):
    print(request)
    e = request.GET.get('email', '')
    p = request.GET.get('password', '')
    sucess = loginR_raw_sql_query(e, p)
    return JsonResponse(sucess, safe=False)
    # return render(request, 'login.html',{ 'email' :e, 'password':p})

def forgotpass(request):
    e = request.GET.get('email', '')
    p = request.GET.get('newpass', '')
    print(request, e, p)
    sucess = forgot_pass(e, p)
    print(sucess)
    return JsonResponse(sucess, safe=False)

def unsubscribe(request):
    e = request.GET.get('email', '')
    print(request, e)
    sucess = unsub(e)
    print(sucess)
    return JsonResponse(sucess, safe=False)

def registernew(request):
    e = request.GET.get('email', '')
    p = request.GET.get('password', '')
    a = request.GET.get('address', '')
    p_no = request.GET.get('phone', '')
    name = request.GET.get('name', '')
    print(request, e, p, a, p_no, name)
    sucess = register(e, p, a, name, p_no)
    return JsonResponse(sucess, safe=False)

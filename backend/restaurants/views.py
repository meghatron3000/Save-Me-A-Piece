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

class RestaurantListCreate(generics.ListCreateAPIView):
    queryset = Restaurant.objects.all()
    serializer_class = RestaurantSerializer

from django.http import Http404
from django.shortcuts import render
from  .models import my_custom_sql, forgot_passNon, forgot_passRes,unsubNon,unsubRes, registerNon, registerRes, loginRes, loginNon, mysearch, get_dishes, get_nonp, get_res

def index(request):
    all_restaurants = my_custom_sql()
    # return render(request, 'index.html',{ 'all_restaurants' :all_restaurants})
    return JsonResponse(all_restaurants, safe=False)

def loginR(request):
    print(request)
    e = request.GET.get('email', '')
    p = request.GET.get('password', '')
    sucess = loginRes(e, p)
    return JsonResponse(sucess, safe=False)
    # return render(request, 'login.html',{ 'email' :e, 'password':p})
def loginN(request):
    print(request)
    e = request.GET.get('email', '')
    p = request.GET.get('password', '')
    sucess = loginNon(e, p)
    return JsonResponse(sucess, safe=False)
    # return render(request, 'login.html',{ 'email' :e, 'password':p})

def forgotpassR(request):
    e = request.GET.get('email', '')
    p = request.GET.get('newpass', '')
    print(request, e, p)
    sucess = forgot_passRes(e, p)
    print(sucess)
    return JsonResponse(sucess, safe=False)

def forgotpassN(request):
    e = request.GET.get('email', '')
    p = request.GET.get('newpass', '')
    print(request, e, p)
    sucess = forgot_passNon(e, p)
    print(sucess)
    return JsonResponse(sucess, safe=False)

def unsubscribeN(request):
    e = request.GET.get('email', '')
    print(request, e)
    sucess = unsubRes(e)
    print(sucess)
    return JsonResponse(sucess, safe=False)

def unsubscribeR(request):
    e = request.GET.get('email', '')
    print(request, e)
    sucess = unsubNon(e)
    print(sucess)
    return JsonResponse(sucess, safe=False)

def unsubscribe_dish(request):
    n = request.GET.get('name', '')
    print(request, e)
    sucess = delete_dish(n)
    print(sucess)
    return JsonResponse(sucess, safe=False)

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
    print(request, e, p, a, p_no, name)
    sucess = registerRes(e, p, a, name, p_no)
    return JsonResponse(sucess, safe=False)
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
    print(request, e, p, a, p_no, name)
    sucess = registerNon(e, p, a, name, p_no)
    return JsonResponse(sucess, safe=False)

@csrf_exempt 
def registernew_dish(request):
    body_unicode = request.body.decode('utf-8')
    body = json.loads(body_unicode)
    print(body)
    r = body["restuarant"]
    n = body["name"]
    p = body["price"]
    l = body["listTime"]
    print(request, r,n,p,l)
    sucess = register_dish(r,n,p,l)
    return JsonResponse(sucess, safe=False)

def showSearch(request):
    name = request.GET.get('name', '')
    print(request)
    found = mysearch(name)
    return render(request, 'search.html',{ 'name' :name})

def find_res(request):
    print(request)
    e = request.GET.get('name', '')
    sucess = get_res(e)
    return JsonResponse(sucess, safe=False)

def find_nonP(request):
    print(request)
    e = request.GET.get('name', '')
    sucess = get_nonp(e)
    return JsonResponse(sucess, safe=False)

def find_dishes(request):
    print(request)
    e = request.GET.get('restaurant', '')
    sucess = get_dishes(e)
    return JsonResponse(sucess, safe=False)
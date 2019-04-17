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
from  .models import forgot_passNon, unsubNon,registerNon, loginNon, get_nonp

def loginN(request):
    print(request)
    e = request.GET.get('email', '')
    p = request.GET.get('password', '')
    sucess = loginNon(e, p)
    return JsonResponse(sucess, safe=False)
    # return render(request, 'login.html',{ 'email' :e, 'password':p})

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
    sucess = unsubNon(e)
    print(sucess)
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
    z = body["zip_code"]
    print(request, e, p, a, p_no, name)
    sucess = registerNon(e, p, a, name, p_no, z)
    return JsonResponse(sucess, safe=False)

def find_nonP(request):
    print(request)
    e = request.GET.get('email', '')
    sucess = get_nonp(e)
    return JsonResponse(sucess, safe=False)

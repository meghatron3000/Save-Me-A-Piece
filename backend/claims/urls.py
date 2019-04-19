from django.urls import path
from . import views
from . import models
urlpatterns = [
    path('api/requests/', views.requests ),
    path('api/requests/subtract_req_from_dish', views.subtract_req_from_dish )
]
from django.urls import path
from . import views
from . import models
urlpatterns = [
    path('api/restaurant/', views.RestaurantListCreate.as_view() ),
    path('api/get/', views.index ),
    path('api/loginRes/', views.loginR ),
    path('api/forgotpassRes/', views.forgotpassR ),
    path('api/unsubRes/', views.unsubscribeR ),
    path('api/registerRes/', views.registernewR ),
    path('api/restaurant/username/', views.find_res ),
]
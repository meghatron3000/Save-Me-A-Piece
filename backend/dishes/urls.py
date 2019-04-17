from django.urls import path
from . import views
from . import models
urlpatterns = [
    path('api/register_dish/', views.registernew_dish ),
    path('api/unsub_dish/', views.unsubscribe_dish ),
    path('api/dishes/atRes/', views.find_dishes),
    path('api/dishes/getPrice/', views.get_price),
]
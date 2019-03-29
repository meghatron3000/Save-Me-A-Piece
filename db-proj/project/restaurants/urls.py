from django.urls import path
from . import views
urlpatterns = [
    path('api/restaurant/', views.RestaurantListCreate.as_view() ),
]
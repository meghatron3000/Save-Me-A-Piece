from django.urls import path
from . import views
from . import models
urlpatterns = [
    path('api/restaurant/', views.RestaurantListCreate.as_view() ),
    
    # path('api/get', models.GetRestaurants_raw_sql_query ),
    # path('api/get', models.main_rest ),
    # path('api/get/', models.my_custom_sql ),
    path('api/get/', views.index ),
    path('api/login/', views.login ),
    path('api/forgotpass/', views.forgotpass ),
    path('api/unsub/', views.unsubscribe ),
    path('api/register/', views.registernew ),
    path('api/register_dish/', views.registernew_dish ),
    path('api/unsub_dish/', views.unsubscribe_dish ),
    # path('get/', index.html )
    # path('search/', views.showSearch)
]
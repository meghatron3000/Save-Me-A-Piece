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

    # path('get/', index.html )
]
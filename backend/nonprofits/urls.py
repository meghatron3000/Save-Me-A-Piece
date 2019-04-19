from django.urls import path
from . import views
from . import models
urlpatterns = [
    path('api/nonprofits/', views.nonprofits ),
    path('api/nonprofits/email/', views.get_data_by_email ),
    path('api/nonprofits/password/', views.change_password ),
]
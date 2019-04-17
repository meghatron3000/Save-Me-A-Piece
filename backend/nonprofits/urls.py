from django.urls import path
from . import views
from . import models
urlpatterns = [
    path('api/loginNonP/', views.loginN ),
    path('api/forgotpassNonP/', views.forgotpassN ),
    path('api/unsubNonP/', views.unsubscribeN ),
    path('api/registerNonP/', views.registernewN ),
    path('api/nonprofit/username/', views.find_nonP ),
]
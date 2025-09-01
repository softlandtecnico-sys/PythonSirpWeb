from django.urls import path
from . import views

urlpatterns = [
    path('mdi/', views.mdi_home, name='mdi_home'),
 
]
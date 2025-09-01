from django.urls import path
from . import views

urlpatterns = [
     path('', views.home, name="home"),  # Muestra el HTML principal
     path('buscar_usuario/', views.buscar_usuario, name="buscar_usuario"),  # API para consulta

]
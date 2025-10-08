from django.urls import path
from . import views

urlpatterns = [
    path('FCrearUsuario/', views.FCrearUsuario, name="CrearUsuario"),
    path('FMantenimientoUsuario/', views.FMantenimientoUsuario, name="MantenimientoUsuario"),





    path('MostrarTipoUsuario/', views.MostrarTipoUsuario, name="MostrarTipoUsuario"), 
    path('ListarRolParaUsuarios/', views.ListarRolParaUsuarios, name="ListarRolParaUsuarios"), 
    path('GuardaUsuario/', views.GuardaUsuario, name="GuardaUsuario"),
    path('BuscarUsuario/', views.BuscarUsuario, name="BuscarUsuario"),
    ]
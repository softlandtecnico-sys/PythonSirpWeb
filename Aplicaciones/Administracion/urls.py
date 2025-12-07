from django.urls import path
from . import views
from Aplicaciones.Global.views import GuardarAuditoria 


urlpatterns = [
    path('FCrearUsuario/', views.FCrearUsuario, name="CrearUsuario"),
    path('FMantenimientoUsuario/', views.FMantenimientoUsuario, name="MantenimientoUsuario"),
    path('FDefinirRoles/', views.FDefinirRolesUsuario, name="DefinirRoles"),





    path('MostrarTipoUsuario/', views.MostrarTipoUsuario, name="MostrarTipoUsuario"), 
    path('ListarRolParaUsuarios/', views.ListarRolParaUsuarios, name="ListarRolParaUsuarios"), 
    path('GuardaUsuario/', views.GuardaUsuario, name="GuardaUsuario"),
    path('BuscarUsuario/', views.BuscarUsuario, name="BuscarUsuario"),
    path('ListarUsuariosFiltrado/', views.ListarUsuariosFiltrado, name="ListarUsuariosFiltrado"),
    path('ListarPermisos/', views.ListarPermisos, name="ListarPermisos"),
    path('ActualizarUsuario/', views.ActualizarUsuario, name="ActualizarUsuario"),
    path('GuardarAuditoria/', GuardarAuditoria, name="GuardarAuditoria"),
    

    ]
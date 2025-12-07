from Aplicaciones.Global.Utils.encriptador import Encriptador
from Aplicaciones.Global.Utils.Auditoria import AuditoriaDatos
from Aplicaciones.Global.Utils.Usuario import UsuarioDatos
from django.shortcuts import render
import json
from django.http import JsonResponse


# Create your views here.
def FCrearUsuario(request):
    return render(request, "CreacionUsuario.html")
def FMantenimientoUsuario(request):
    return render(request, "MantenimientoUsuario.html")
def FDefinirRolesUsuario(request):
    return render(request, "DefinirRoles.html")





def BuscarUsuario(request):     
    if request.method == "POST":
        try:
            data = json.loads(request.body)
            param0 = "1" 
            param1 = data.get("param1")  
            param2 = "1"                              
            consultas = UsuarioDatos()            
            datos = consultas.BuscarUsuarioDatos("BuscarUsuario", [param0,param1,param2])
            if datos:            
                datos_list = [dict(row) for row in datos]               
                return JsonResponse(datos_list, safe=False)
            else:             
                return JsonResponse([{"Id_Usuario": 0, "mensaje": "No se encontraron datos", "Id_Usuario":  0}], safe=False)
        except Exception as e:
            return JsonResponse([{"mensaje": str(e),"Id_Usuario": 0}], safe=False)
    return JsonResponse({"mensaje": "Método no encontrado","Id_Usuario": 0}, safe=False)

def GuardaUsuario(request):     
    if request.method == "POST":
        try:
            data = json.loads(request.body)
            param0 = "1" 
            param1 = data.get("param1")  
            param2 = data.get("param2")    
            param3 = data.get("param3") 
            param4 = data.get("param4") 
            param5 = Encriptador.encriptar_cadena(data.get("param5"))
            param6 = data.get("param6")
            param7 = data.get("param7") 
            param8 = data.get("param8") 
            param9 = data.get("param9")        
            consultas = UsuarioDatos()
            print(data)
            datos = consultas.GuardaUsuarioDatos("GuardarUsuario", [param0,param1,param2,param3,param4,param5,param6,param7,param8,param9])
            if datos:  
                return JsonResponse(datos, safe=False)
            else:             
                return JsonResponse([{"Id_Usuario": 0, "mensaje": "No se encontraron datos", "exito":  0}], safe=False)
        except Exception as e:
            return JsonResponse([{"mensaje": str(e),"exito": 0}], safe=False)
    return JsonResponse({"mensaje": "Método no encontrado","exito": 0}, safe=False)



def ActualizarUsuario(request):     
    if request.method == "POST":
        try:
            data = json.loads(request.body)
            param0 = data.get("param0")   
            param1 = data.get("param1")  
            param2 = data.get("param2")    
            param3 = data.get("param3") 
            param4 = data.get("param4") 
            param5 = Encriptador.encriptar_cadena(data.get("param5"))
            param6 = data.get("param6")
            param7 = data.get("param7") 
            param8 = data.get("param8")                  
            consultas = UsuarioDatos()
            datos = consultas.ActualizarUsuarioDatos("ActualizarUsuario", [param0,param1,param2,param3,param4,param5,param6,param7,param8])
            if datos:  
                return JsonResponse(datos, safe=False)
            else:             
                return JsonResponse([{"Id_Usuario": 0, "mensaje": "No se encontraron datos", "exito":  0}], safe=False)
        except Exception as e:
            return JsonResponse([{"mensaje": str(e),"exito": 0}], safe=False)
    return JsonResponse({"mensaje": "Método no encontrado","exito": 0}, safe=False)

def ListarRolParaUsuarios(request):     
    if request.method == "POST":
        try:          
            consultas = UsuarioDatos()                  
            datos = consultas.ListarRolParaUsuariosDatos("ListarRolParaUsuarios")
            if datos:            
                datos_list = [dict(row) for row in datos]
                return JsonResponse(datos_list, safe=False)
            else:
                return JsonResponse([{"IdRolUsuario": 0, "mensaje": "No se encontraron datos","exito": 0}], safe=False)
        except Exception as e:
            return JsonResponse([{"mensaje": str(e),"exito": 0}], safe=False)

    return JsonResponse({"mensaje": "Método no permitido","exito": 0})

def MostrarTipoUsuario(request):     
    if request.method == "POST":
        try:          
            consultas = UsuarioDatos()                  
            datos = consultas.MostrarTipoUsuarioDatos("ListarTipoUsuario")
            if datos:            
                datos_list = [dict(row) for row in datos]
                return JsonResponse(datos_list, safe=False)
            else:
                return JsonResponse([{"Id_TipoUsuario": 0, "mensaje": "No se encontraron datos","exito": 0}], safe=False)
        except Exception as e:
            return JsonResponse([{"mensaje": str(e),"exito": 0}], safe=False)

    return JsonResponse({"mensaje": "Método no permitido","exito": 0})

def ListarUsuariosFiltrado(request):     
    if request.method == "POST":
        try:
       
            data = json.loads(request.body)
            param0 = data.get("param0")  
            param1 = data.get("param1")                   
            consultas = UsuarioDatos()        
            datos = consultas.ListarUsuariosFiltradoDatos("ListarUsuariosFiltrado", [param0,param1])     
            if datos:  
                return JsonResponse(datos, safe=False)
            else:             
                return JsonResponse([{"Id_Usuario": 0, "mensaje": "No se encontraron datos", "exito":  0}], safe=False)
        except Exception as e:
            return JsonResponse([{"mensaje": str(e),"exito": 0}], safe=False)
    return JsonResponse({"mensaje": "Método no encontrado","exito": 0}, safe=False)


def ListarPermisos(request):     
    if request.method == "POST":
        try:
       
            data = json.loads(request.body)
            param0 = data.get("param0")                            
            consultas = UsuarioDatos()        
            datos = consultas.ListarPermisosDatos("ListarPermisos", [param0])     
            if datos:  
                return JsonResponse(datos, safe=False)
            else:             
                return JsonResponse([{"IdRolUsuario": 0, "mensaje": "No se encontraron datos", "exito":  0}], safe=False)
        except Exception as e:
            return JsonResponse([{"mensaje": str(e),"exito": 0}], safe=False)
    return JsonResponse({"mensaje": "Método no encontrado","exito": 0}, safe=False)
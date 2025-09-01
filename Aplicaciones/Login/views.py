from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_POST
import json
from .models import ConsultaLogin 
from Aplicaciones.Global.Utils.encriptador import Encriptador

def buscar_usuario(request):    
    if request.method == "POST":
        try:
 
            data = json.loads(request.body)
            param0 = data.get("param0")
            param1 = data.get("param1")
            param2 = data.get("param2")
            consultas = ConsultaLogin()                  
            datos = consultas.BuscarUsuario("BuscarUsuario", [param0, param1, Encriptador.encriptar_cadena(param2)])
            if datos:            
                datos_list = [dict(row) for row in datos]
                return JsonResponse(datos_list, safe=False)
            else:
                return JsonResponse([{"Id_Usuario": 0, "mensaje": "No se encontraron datos"}], safe=False)
        except Exception as e:
            return JsonResponse([{"error": str(e)}], safe=False, status=500)

    return JsonResponse({"error": "Método no permitido"}, status=405)
     

def home(request):
     return render(request,"login.html")
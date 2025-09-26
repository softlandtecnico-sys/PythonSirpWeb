from django.shortcuts import render
from Aplicaciones.Global.Utils.Libros import LibrosDatos
from Aplicaciones.Global.Utils.ListarFolios import ListarFoliosDatos
from django.http import JsonResponse
import json

#------------------------------Libros
def ListarLibrosVigentes(request):     
    if request.method == "POST":
        try:          
            consultas = LibrosDatos()                  
            datos = consultas.ListarLibrosVigentesPorDatos("ListarLibros")
            if datos:            
                datos_list = [dict(row) for row in datos]
                return JsonResponse(datos_list, safe=False)
            else:
                return JsonResponse([{"Cod_Libro": 0, "mensaje": "No se encontraron datos"}], safe=False)
        except Exception as e:
            return JsonResponse([{"error": str(e)}], safe=False, status=500)

    return JsonResponse({"error": "Método no permitido"}, status=405)

#------------------------------Folios
def ListarFolio(request):     
    if request.method == "POST":
        try:
            data = json.loads(request.body)
            param0 = data.get("param0") 
            param1 = data.get("param1")  
            param2 = data.get("param2")          
            consultas = ListarFoliosDatos()            
            datos = consultas.ListarFolioDatos("ListarFolios", [param0,param1,param2])
            if datos:            
                datos_list = [dict(row) for row in datos]               
                return JsonResponse(datos_list, safe=False)
            else:             
                return JsonResponse([{"Id_Inscripcion": 0, "mensaje": "No se encontraron datos", "error": "Error"}], safe=False)
        except Exception as e:
            return JsonResponse([{"error": str(e)}], safe=False, status=500)
    return JsonResponse({"error": "Método no encontrado"}, status=405)

def ActualizarFolio(request):  
  
    if request.method == "POST":
        try:
            data = json.loads(request.body)
            param0 = data.get("param0") 
            param1 = data.get("param1")  
            param2 = data.get("param2")    
            param3 = data.get("param3")       
            consultas = ListarFoliosDatos()            
            filas_afectadas = consultas.ActualizarFoliosDatos("ActualizarFolios", [param0,param1,param2,param3])   
            print(request.body)      
            print(filas_afectadas)    
            if filas_afectadas > 0:
              print("entrandooooooooooooooooooooooooooooo")
              datos = [{"exito": 1, "mensaje": "Actualización realizada correctamente"}]
            else:
                    print("entrandooooooooooooooooooooooooooooo elseeee")
                    datos = [{"exito": 0, "mensaje": "No se actualizó ningún registro"}]
            datos_list = [dict(row) for row in datos] 
            return JsonResponse(datos_list, safe=False)
        except Exception as e:
            return JsonResponse([{"error": str(e)}], safe=False, status=500)
    return JsonResponse({"error": "Método no encontrado"}, status=405)

# Create your views here.

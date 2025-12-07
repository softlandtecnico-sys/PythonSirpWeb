from django.shortcuts import render
from Aplicaciones.Global.Utils.Libros import LibrosDatos
from Aplicaciones.Global.Utils.ListarFolios import ListarFoliosDatos
from Aplicaciones.Global.Utils.Auditoria import AuditoriaDatos
from Aplicaciones.Global.Utils.ListarCarpetasCompartidas import CarpetasDatos
from Aplicaciones.Global.Utils.Usuario import UsuarioDatos
from Aplicaciones.Global.Utils.encriptador import Encriptador
from datetime import datetime    

from django.http import JsonResponse
import json
import os
import base64
#-----------------------------autorizacion
def ValidarUsuarioNombre(request):    
    if request.method == "POST":
        try:
            data = json.loads(request.body)
            param0 = data.get("param0") 
            param1 = Encriptador.encriptar_cadena(data.get("param1"))                   
            consultas = UsuarioDatos()            
            datos = consultas.ValidarUsuarioNombreDatos("ValidarUsuarioNombre", [param0,param1]) 
            if datos:            
                datos_list = [dict(row) for row in datos]
                return JsonResponse(datos_list, safe=False)
            else:
                return JsonResponse([{"Id_Usuario": 0, "mensaje": "Credenciales incorrectas"}], safe=False)
        except Exception as e:
            return JsonResponse([{"error": str(e)}], safe=False)
    return JsonResponse({"error": "Método no encontrado"}, safe=False)


#-----------------------------DOCUMENTOS
def ArchivoDocTramite(request):
    if request.method == "POST":
        try:
            data = json.loads(request.body)  
            param0 = data.get("param0") 
            param1 = data.get("param1") 
            param2 = data.get("param2") 
            mTipoRegistro = param0[0]
            ptxtLibro = param0[0:1]
            ptxtInscripcion = param0[6:12]
            pAño = param0[2:6]
            ptxtInscripcionsalida= str(ptxtInscripcion).zfill(6)[-6:]
            pNombredelArchivo= f"{ptxtLibro}1{pAño}{ptxtInscripcionsalida}"        
            listaCarpetas = CarpetasDatos.listar_carpetas_compartidas()
            mSufijo = "00"
            if param2 == "1":
             sCarpetaTramite = os.path.join(listaCarpetas[0][param1],f"{pNombredelArchivo}.pdf")    
            if param2 == "2":
             sCarpetaTramite = os.path.join(listaCarpetas[0][param1],pAño,f"{pNombredelArchivo}{mSufijo}.pdf")       
           
            if os.path.exists(sCarpetaTramite):
                with open(sCarpetaTramite, "rb") as f:
                    pdf_bytes = f.read()  # <-- aquí tienes el PDF en bytes
                    pdf_base64 = base64.b64encode(pdf_bytes).decode('utf-8')
                    return JsonResponse([{"archivo_base64": pdf_base64, "mensaje": 1}], safe=False)
            else:
                 return JsonResponse([{"archivo_base64": None, "mensaje": 0}],safe=False)

        except Exception as e:
            return JsonResponse([{"error": str(e)}], safe=False, status=500)
    return JsonResponse({"error": "Método no permitido"}, status=405)
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
            return JsonResponse(filas_afectadas, safe=False)
        except Exception as e:
            return JsonResponse([{"error": str(e)}], safe=False)
    return JsonResponse({"error": "Método no encontrado"}, safe=False)



#------------------------------Opcion Administrador




#------------------------------Auditoria

def GuardarAuditoria(request):    

    if request.method == "POST":
        try:
            data = json.loads(request.body)      
            param0 = data.get("param0") 
            param1 = data.get("param1")  
            param2 = data.get("param2")   
            param3 = data.get("param3")  
            param4 = data.get("param4")  
            param5 = data.get("param5")  
            param6 = data.get("param6")  
            param7 = data.get("param7")       
            consultas = AuditoriaDatos()  
            print(data);          
            filas_afectadas = consultas.GuardarAuditoriaDatos("Guardar_Auditoria", [param0,param1,param2,param3,param4,param5,param6,param7]) 
            return JsonResponse(filas_afectadas, safe=False)
        except Exception as e:
            return JsonResponse([{"error": str(e)}], safe=False)
    return JsonResponse({"error": "Método no encontrado"}, safe=False)
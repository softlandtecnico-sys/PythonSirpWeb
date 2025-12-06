from django.shortcuts import render
from django.http import JsonResponse
import json
import os
import base64
from .models import BuscarDatos
from Aplicaciones.Global.Utils.ListarCarpetasCompartidas import CarpetasDatos
from Aplicaciones.Global.Utils.Digitalizacion import Digitalizacion


# Create your views here.

def FOrdenesInscripcion(request):
    return render(request, "OrdenesInscripcion.html")
def FOrdenesPrelacion(request):
    return render(request, "OrdenesPrelacion.html")
def FConsultarNotasApuntes(request):
    return render(request, "ConsultarNotasApuntes.html")
def FNotasDevoNegativa(request):
    return render(request, "NotasDevoNegativa.html")
def FBuscarIncripcion(request):
    return render(request, "BuscarInscripcion.html")
def FListadoInscripcionesIngresar(request):
    return render(request, "ListadoInscripcionesporingresar.html")
def FListarFolio(request):
    return render(request, "ListarFolio.html")
def FNuevaFichaRegistral(request):
    return render(request, "NuevaFichaRegistral.html")
def FControlCalidad(request):
    return render(request, "ControlCalidadInscripcion.html")


def ListarBuscarPor(request):     
    if request.method == "POST":
        try:          
            consultas = BuscarDatos()                  
            datos = consultas.MostrarBuscarPorDatos("ListarBuscarPor")
            if datos:            
                datos_list = [dict(row) for row in datos]
                return JsonResponse(datos_list, safe=False)
            else:
                return JsonResponse([{"Id_Usuario": 0, "mensaje": "No se encontraron datos"}], safe=False)
        except Exception as e:
            return JsonResponse([{"error": str(e)}], safe=False, status=500)

    return JsonResponse({"error": "Método no permitido"}, status=405)

def ListadoRevision(request):     
    if request.method == "POST":
        try:
            data = json.loads(request.body)
            param0 = data.get("param0")  
            consultas = BuscarDatos()                  
            datos = consultas.ListadoRevisionDatos("ListarRevision", [param0])
            if datos:            
                datos_list = [dict(row) for row in datos]
                return JsonResponse(datos_list, safe=False)
            else:
                return JsonResponse([{"Id_Usuario": 0, "mensaje": "No se encontraron datos"}], safe=False)
        except Exception as e:
            return JsonResponse([{"error": str(e)}], safe=False, status=500)

    return JsonResponse({"error": "Método no permitido"}, status=405)

def ListarNotaInscripcion(request):     
    if request.method == "POST":
        try:
            data = json.loads(request.body)
            param0 = data.get("param0") 
            param1 = data.get("param1")  
            param2 = data.get("param2")             
            consultas = BuscarDatos()            
            datos = consultas.ListarNotaInscripcionDatos("ListarNota", [param0,param1,param2])
            if datos:            
                datos_list = [dict(row) for row in datos]               
                return JsonResponse(datos_list, safe=False)
            else:             
                return JsonResponse([{"IdComprobante": 0, "mensaje": "No se encontraron datos"}], safe=False)
        except Exception as e:
            return JsonResponse([{"error": str(e)}], safe=False, status=500)
    return JsonResponse({"error": "Método no permitido"}, status=405)

def ListarApuntesInscripcion(request):     
    if request.method == "POST":
        try:
            data = json.loads(request.body)
            param0 = "0" 
            param1 = data.get("param1")           
            consultas = BuscarDatos()            
            datos = consultas.ListarApuntesInscripcionDatos("ListarApunte", [param0,param1])
            if datos:            
                datos_list = [dict(row) for row in datos]               
                return JsonResponse(datos_list, safe=False)
            else:             
                return JsonResponse([{"IdComprobante": 0, "mensaje": "No se encontraron datos"}], safe=False)
        except Exception as e:
            return JsonResponse([{"error": str(e)}], safe=False, status=500)
    return JsonResponse({"error": "Método no permitido"}, status=405)

def MostrarOrdenesPendientes(request):     
    if request.method == "POST":
        try:
            data = json.loads(request.body)
            param0 = data.get("param0")  
            param1 = data.get("param1")  
            consultas = BuscarDatos()     
            print(json.loads(request.body));             
            datos = consultas.MostrarOrdenesPendientesDatos("BuscarOrdenesPendientes", [param0,param1])
            if datos:            
                datos_list = [dict(row) for row in datos]
                return JsonResponse(datos_list, safe=False)
            else:
                return JsonResponse([{"exito": 1, "mensaje": "No se encontraron datos"}], safe=False)
        except Exception as e:
            return JsonResponse([{"mensaje": str(e), "exito": 0}], safe=False)
    return JsonResponse({"mensaje": "Método no permitido"}, status=405)

def ListarAsignacionCalidad(request):     
    if request.method == "POST":
        try:
            data = json.loads(request.body)
            param0 = data.get("param0")  
            param1 = data.get("param1")  
            param2 = data.get("param2")  
            param3 = data.get("param3")  
            consultas = BuscarDatos()            
            datos = consultas.ControlCalidadInscripcionDatos("ListarAsignacionCalidad", [param0,param1,param2,param3])
            if datos:            
                datos_list = [dict(row) for row in datos]               
                return JsonResponse(datos_list, safe=False)
            else:
             
                return JsonResponse([{"Id": 0, "mensaje": "No se encontraron datos"}], safe=False)
        except Exception as e:
            return JsonResponse([{"error": str(e)}], safe=False, status=500)
    return JsonResponse({"error": "Método no permitido"}, status=405)

def ListarIngresoInscripciones(request):     
    if request.method == "POST":
        try:          
            consultas = BuscarDatos()                  
            datos = consultas.ListarIngresoInscripcionesDatos("ListarIngresoInscripciones")
            if datos:            
                datos_list = [dict(row) for row in datos]
                return JsonResponse(datos_list, safe=False)
            else:
                return JsonResponse([{"IdComprobante": 0, "mensaje": "No se encontraron datos"}], safe=False)
        except Exception as e:
            return JsonResponse([{"error": str(e)}], safe=False, status=500)

    return JsonResponse({"error": "Método no permitido"}, status=405)

def BuscarDevoluciones(request):     
    if request.method == "POST":
        try:
            data = json.loads(request.body)
            param0 = data.get("param0")  
            param1 = data.get("param1")  
            param2 = data.get("param2")  
            consultas = BuscarDatos()            
            datos = consultas.BuscarDevolucionesDatos("MostrarDevolucionRegistral", [param0,param1,param2])
            if datos:            
                datos_list = [dict(row) for row in datos]               
                return JsonResponse(datos_list, safe=False)
            else:             
                return JsonResponse([{"Id_Inscripcion": 0, "mensaje": "No se encontraron datos"}], safe=False)
        except Exception as e:
            return JsonResponse([{"error": str(e)}], safe=False, status=500)
    return JsonResponse({"error": "Método no permitido"}, status=405)

def BuscarComproFactura(request):     
    if request.method == "POST":
        try:
            data = json.loads(request.body)
            param0 = data.get("param0")  
            consultas = BuscarDatos()            
            datos = consultas.BuscarComproFacturaDatos("BuscarComproFactura", [param0])
            if datos:            
                datos_list = [dict(row) for row in datos]               
                return JsonResponse(datos_list, safe=False)
            else:             
                return JsonResponse([{"IdComprobante": 0, "mensaje": "No se encontraron datos"}], safe=False)
        except Exception as e:
            return JsonResponse([{"error": str(e)}], safe=False, status=500)
    return JsonResponse({"error": "Método no permitido"}, status=405)

def AgregarNota(request):
    if request.method == "POST":
        try:
            data = json.loads(request.body)
            param0 = "1"
            param1 = data.get("param1") 
            param2 = data.get("param2") 
            param3 = data.get("param3") 
            param4 = data.get("param4") 
   
            consultas = BuscarDatos()            
            datos = consultas.AgregarNotaDatos("AgregarNota", [param0,param1,param2,param3,param4])
            if datos:            
                datos_list = [dict(row) for row in datos]               
                return JsonResponse(datos_list, safe=False)
            else:             
                return JsonResponse([{"IdComprobante": 0, "mensaje": "No se encontraron datos"}], safe=False)
        except Exception as e:
            return JsonResponse([{"error": str(e)}], safe=False, status=500)
    return JsonResponse({"error": "Método no permitido"}, status=405)
def AgregarApuntes(request):
    if request.method == "POST":
        try:
            data = json.loads(request.body)
            param0 = "1"
            param1 = data.get("param1") 
            param2 = data.get("param2") 
            param3 = data.get("param3") 
   
            consultas = BuscarDatos()            
            datos = consultas.AgregarApuntesDatos("AgregarApunte", [param0,param1,param2,param3])
            if datos:            
                datos_list = [dict(row) for row in datos]               
                return JsonResponse(datos_list, safe=False)
            else:             
                return JsonResponse([{"IdComprobante": 0, "mensaje": "No se encontraron datos"}], safe=False)
        except Exception as e:
            return JsonResponse([{"error": str(e)}], safe=False, status=500)
    return JsonResponse({"error": "Método no permitido"}, status=405)

def BuscarApuntes(request):     
    if request.method == "POST":
        try:
            data = json.loads(request.body)
            param0 = data.get("param0")  
            param1 = data.get("param1") 
            consultas = BuscarDatos()            
            datos = consultas.BuscarApuntesDatos("ListarApunte", [param0,param1])
            if datos:            
                datos_list = [dict(row) for row in datos]               
                return JsonResponse(datos_list, safe=False)
            else:             
                return JsonResponse([{"IdComprobante": 0, "mensaje": "No se encontraron datos"}], safe=False)
        except Exception as e:
            return JsonResponse([{"error": str(e)}], safe=False, status=500)
    return JsonResponse({"error": "Método no permitido"}, status=405)

def ListarNota(request):     
    if request.method == "POST":
        try:
            data = json.loads(request.body)
            param0 = data.get("param0")  
            param1 = data.get("param1") 
            param2 = "I"
            consultas = BuscarDatos()            
            datos = consultas.ListarNotaDatos("ListarNota", [param0,param1,param2])
            if datos:            
                datos_list = [dict(row) for row in datos]               
                return JsonResponse(datos_list, safe=False)
            else:             
                return JsonResponse([{"IdComprobante": 0, "mensaje": "No se encontraron datos"}], safe=False)
        except Exception as e:
            return JsonResponse([{"error": str(e)}], safe=False, status=500)
    return JsonResponse({"error": "Método no permitido"}, status=405)

def ArchivoDocNDCertificado(request):
    if request.method == "POST":
        try:
            data = json.loads(request.body)
            param0 = data.get("param0") 
            mTipoRegistro = param0[0]
            pAño = param0[1:5]
            listaCarpetas = CarpetasDatos.listar_carpetas_compartidas()
            sCarpetaDevolutivas = os.path.join(listaCarpetas[0]["CarpetaDevolucion"],pAño,mTipoRegistro,f"{param0}.pdf")
            if os.path.exists(sCarpetaDevolutivas):
                with open(sCarpetaDevolutivas, "rb") as f:
                    pdf_bytes = f.read()  # <-- aquí tienes el PDF en bytes
                    pdf_base64 = base64.b64encode(pdf_bytes).decode('utf-8')
                    return JsonResponse([{"archivo_base64": pdf_base64, "mensaje": 1}], safe=False)
            else:
                 return JsonResponse([{"archivo_base64": None, "mensaje": 0}],safe=False)

        except Exception as e:
            return JsonResponse([{"error": str(e)}], safe=False, status=500)
    return JsonResponse({"error": "Método no permitido"}, status=405)




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
            datos = consultas.BuscarDevolucionesDatos("ListarNota", [param0,param1,param2])
            if datos:            
                datos_list = [dict(row) for row in datos]               
                return JsonResponse(datos_list, safe=False)
            else:             
                return JsonResponse([{"Id_Inscripcion": 0, "mensaje": "No se encontraron datos"}], safe=False)
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
                return JsonResponse([{"No_Comprobate": 0, "mensaje": "No se encontraron datos"}], safe=False)
        except Exception as e:
            return JsonResponse([{"error": str(e)}], safe=False, status=500)
    return JsonResponse({"error": "Método no permitido"}, status=405)

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

def ArchivoDocTramiteInscripcion(request):
    if request.method == "POST":
        try:
            data = json.loads(request.body)  
            param0 = data.get("param0") 
            mTipoRegistro = param0[0]
            ptxtLibro = param0[0:1]
            ptxtInscripcion = param0[6:12]
            pAño = param0[2:6]
            ptxtInscripcionsalida= str(ptxtInscripcion).zfill(6)[-6:]
            pNombredelArchivo= f"{ptxtLibro}1{pAño}{ptxtInscripcionsalida}"        
            listaCarpetas = CarpetasDatos.listar_carpetas_compartidas()
            sCarpetaTramite = os.path.join(listaCarpetas[0]["CarpetaTramite"],f"{pNombredelArchivo}.pdf")    
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

def ArchivoDocTramiteDevuelto(request):
    if request.method == "POST":
        try:
            data = json.loads(request.body)  
            param0 = data.get("param0") 
            mTipoRegistro = param0[0]
            ptxtLibro = param0[0:1]
            ptxtInscripcion = param0[6:12]
            pAño = param0[2:6]
            ptxtInscripcionsalida= str(ptxtInscripcion).zfill(6)[-6:]
            pNombredelArchivo= f"{ptxtLibro}1{pAño}{ptxtInscripcionsalida}"                   
            listaCarpetas = CarpetasDatos.listar_carpetas_compartidas()          
            mCantDocDevueltos = Digitalizacion.CantidaArchivosPdf(os.path.join(listaCarpetas[0]["CarpetaHD"],pAño,f"{pNombredelArchivo}.pdf"))
            mSufijo = "00"
            print(os.path.join(listaCarpetas[0]["CarpetaHD"],pAño,f"{pNombredelArchivo}{mSufijo}.pdf"))
            print(mSufijo)
            
            sCarpetaTramite = os.path.join(listaCarpetas[0]["CarpetaHD"],pAño,f"{pNombredelArchivo}{mSufijo}.pdf")
          
            if os.path.exists(sCarpetaTramite):
                with open(sCarpetaTramite, "rb") as f:
                    pdf_bytes = f.read()  # <-- aquí tienes el PDF en bytes
                    pdf_base64 = base64.b64encode(pdf_bytes).decode('utf-8')
                    return JsonResponse([{"archivo_base64": pdf_base64, "mensaje": 1}], safe=False)
            else:
                 return JsonResponse([{"archivo_base64": None, "mensaje": 0}],safe=False)

        except Exception as e:
            return JsonResponse([{"error": str(e),"mensaje": -1}], safe=False, status=500)
    return JsonResponse({"error": "Método no permitido"}, status=405)

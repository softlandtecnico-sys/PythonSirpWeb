from django.urls import path
from . import views
from Aplicaciones.Global.views import ListarLibrosVigentes, ListarFolio, ArchivoDocTramite
from Aplicaciones.Global.views import ActualizarFolio

urlpatterns = [
    path('FOrdenesInscripcion/', views.FOrdenesInscripcion, name="OrdenesInscripcion"),
    path('FOrdenesPrelacion/', views.FOrdenesPrelacion, name="OrdenesPrelacion"),
    path('FConsultarNotasApuntes/', views.FConsultarNotasApuntes, name="ConsultarNotasApuntes"),
    path('FNotasDevoNegativa/', views.FNotasDevoNegativa, name="NotasDevoNegativa"),
    path('FBuscarInscripcion/', views.FBuscarIncripcion, name="BuscarInscripcion"),
    path('FListadoInscripcionesporingresar/', views.FListadoInscripcionesIngresar, name="ListadoInscripcionesporingresar"),
    path('FListarFolio/', views.FListarFolio, name="ListarFolio"),
    path('FNuevaFichaRegistral/', views.FNuevaFichaRegistral, name="NuevaFichaRegistral"),
    path('FControlCalidadInscripcion/', views.FControlCalidad, name="ControlCalidadInscripcion"),







     # metodos de consultas
    path('ListarBuscarPor/', views.ListarBuscarPor, name="ListarBuscarPor"), 
    path('ListadoRevision/', views.ListadoRevision, name="ListadoRevision"), 
    path('MostrarOrdenesPendientes/', views.MostrarOrdenesPendientes, name="MostrarOrdenesPendientes"), 
    path('ListarAsignacionCalidad/', views.ListarAsignacionCalidad, name="ListarAsignacionCalidad"), 
    path('ListarIngresoInscripciones/', views.ListarIngresoInscripciones, name="ListarIngresoInscripciones"), 
    path('BuscarDevoluciones/', views.BuscarDevoluciones, name="BuscarDevoluciones"), 
   # path('ArchivoDocNDCertificado/', ArchivoDocNDCertificado, name="ArchivoDocNDCertificado"), 
    path('ArchivoDocTramiteInscripcion/', ArchivoDocTramite, name="ArchivoDocTramiteInscripcion"), 
    path('ArchivoDocTramiteDevuelto/', ArchivoDocTramite, name="ArchivoDocTramiteDevuelto"), 
    path('ListarNotaInscripcion/', views.ListarNotaInscripcion, name="ListarNotaInscripcion"), 
    path('ListarApuntesInscripcion/', views.ListarApuntesInscripcion, name="ListarApuntesInscripcion"), 
    path('BuscarComproFactura/', views.BuscarComproFactura, name="BuscarComproFactura"), 
    path('BuscarApuntes/', views.BuscarApuntes, name="BuscarApuntes"), 
    path('AgregarApuntes/', views.AgregarApuntes, name="AgregarApuntes"), 
    path('ListarNota/', views.ListarNota, name="ListarNota"),
    path('AgregarNota/', views.AgregarNota, name="AgregarNota"),
    path('ListarLibrosVigentes/', ListarLibrosVigentes, name="ListarLibrosVigentes"),
    path('ListarFolio/', ListarFolio, name="ListarFolio"),
    path('ActualizarFolio/', ActualizarFolio, name="ActualizarFolio"),

]
from django.urls import path
from . import views

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
    path('ArchivoDocNDCertificado/', views.ArchivoDocNDCertificado, name="ArchivoDocNDCertificado"), 

]
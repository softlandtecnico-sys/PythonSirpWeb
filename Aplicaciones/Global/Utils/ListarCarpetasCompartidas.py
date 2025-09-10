import configparser
import os
from Aplicaciones.Global.Utils.ConfigBase import ConfigBase

class CarpetasDatos:
    def listar_carpetas_compartidas():
        lista = []    
        config=ConfigBase()
        carpeta_principal= config.carpeta_compartida   
        regis = {
            "CarpetaPrincipal": carpeta_principal,
            "CarpetaCertificado": os.path.join(carpeta_principal, "CertificadosTemp"),
            "CarpetaDinardap": os.path.join(carpeta_principal, "DINARDAP"),
            "CarpetaEscrituras": os.path.join(carpeta_principal, "Libros"),
            "CarpetaPlantillas": os.path.join(carpeta_principal, "Template"),
            "CarpetaReportes": os.path.join(carpeta_principal, "Rep"),
            "CarpetaSRI": os.path.join(carpeta_principal, "SRI"),
            "CarpetaUaf": os.path.join(carpeta_principal, "UAF"),
            "CarpetaRespaldo": os.path.join(carpeta_principal, "Respaldos"),
            "CarpetaTDSRI": os.path.join(carpeta_principal, "TDSRI"),
            "CarpetaWeb": os.path.join(carpeta_principal, "Web"),
            "CarpetaNegativas": os.path.join(carpeta_principal, "Negativas"),
            "CarpetaDevolucion": os.path.join(carpeta_principal, "NotasDevolutivas"),
            "CarpetaFichas": os.path.join(carpeta_principal, "CertFichas"),
            "CarpetaRazon": os.path.join(carpeta_principal, "Razon"),
            "CarpetaInformes": os.path.join(carpeta_principal, "Informes"),
            "CarpetaCertificadoRegistral": os.path.join(carpeta_principal, "Certificados"),
            "CarpetaLibrosActas": os.path.join(carpeta_principal, "LibrosActas"),
            "CarpetaTempQR": os.path.join(carpeta_principal, "TempQR"),
            "CarpetaTramite": os.path.join(carpeta_principal, "Tramites"),
            "CarpetaProformas": os.path.join(carpeta_principal, "Tramites", "Proforma"),
            "CarpetaDocComprobantes": os.path.join(carpeta_principal, "Tramites", "Doc", "Comprobantes"),
            "CarpetaDocProformas": os.path.join(carpeta_principal, "Tramites", "Doc", "Proformas"),
            "CarpetaDocSolicitud": os.path.join(carpeta_principal, "Tramites", "Doc", "Solicitudes"),
            "CarpetaSolicitud": os.path.join(carpeta_principal, "Tramites", "Solicitud"),
            "CarpetaPagosLinea": os.path.join(carpeta_principal, "Tramites", "PagosLinea"),
            "CarpetaPagosLineaProcesados": os.path.join(carpeta_principal, "Tramites", "PagosLinea", "Procesados"),
            "CarpetaPagosPorProcesar": os.path.join(carpeta_principal, "Tramites", "PagosLinea", "PorProcesar"),
            "CarpetaPagosLineaRechazados": os.path.join(carpeta_principal, "Tramites", "PagosLinea", "Rechazados"),
            "CarpetaHD": os.path.join(carpeta_principal, "Tramites", "HDevueltos"),
            "CarpetaArchivo": os.path.join(carpeta_principal, "ArchivoRegistral"),
            "CarpetaTempHuella": os.path.join(carpeta_principal, "TempH"),
            "CarpetaLotaipMensual": os.path.join(carpeta_principal, "TempLOTAIP", "TempLotaipMensual"),
            "CarpetaLotaipGeneral": os.path.join(carpeta_principal, "TempLOTAIP", "TempLotaipGeneral"),
            "CarpetaTempQRFirma": os.path.join(carpeta_principal, "TempQRF"),
        }

        lista.append(regis)
        return lista
        

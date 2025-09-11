import configparser
import os
class Digitalizacion:

 def CantidaArchivosPdf(texto: str):
     try:
        # Validar si existe y es carpeta
        if not os.path.exists(texto): 
            return 0
        if not os.path.isdir(texto):       
            return 0
        # Listar solo los archivos PDF
        coincidencias = [f for f in os.listdir(texto) if f.lower().endswith(".pdf")]
        cantidad = len(coincidencias)
        if cantidad > 0:  
            return cantidad
        else:

            return 0

     except Exception as e:
  
        return 0


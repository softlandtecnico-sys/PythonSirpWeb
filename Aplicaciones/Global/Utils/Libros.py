from django.db import connection

class LibrosDatos:
     def ListarLibrosVigentesPorDatos(self, nombre_proc):       
        try:
            with connection.cursor() as cursor:
                cursor.execute(f"EXEC {nombre_proc}")
                columnas = [col[0] for col in cursor.description]
                filas = cursor.fetchall()
                return [dict(zip(columnas, fila)) for fila in filas]
        except Exception as ex:
         return [{"Error": f"Error ejecutando procedimiento '{nombre_proc}': {ex}"}]
     
    
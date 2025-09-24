from django.db import models
from django.db import connection

# Create your models here.
class BuscarDatos:
     def MostrarBuscarPorDatos(self, nombre_proc):       
        try:
            with connection.cursor() as cursor:
                cursor.execute(f"EXEC {nombre_proc}")
                columnas = [col[0] for col in cursor.description]
                filas = cursor.fetchall()
                return [dict(zip(columnas, fila)) for fila in filas]
        except Exception as ex:
         return [{"Error": f"Error ejecutando procedimiento '{nombre_proc}': {ex}"}]
          

     def ListadoRevisionDatos(self, nombre_proc, parametros=None):       
        try:
            with connection.cursor() as cursor:
                if parametros:
                    placeholders = ",".join(["%s"] * len(parametros))
                    sql = f"EXEC {nombre_proc} {placeholders}"
                    cursor.execute(sql, parametros)
                else:
                    cursor.execute(f"EXEC {nombre_proc}")
                
                columnas = [col[0] for col in cursor.description]
                filas = cursor.fetchall()
                return [dict(zip(columnas, fila)) for fila in filas]
        except Exception as ex:        
            return [{"Error": f"Error ejecutando procedimiento '{nombre_proc}': {ex}"}]
        
     def MostrarOrdenesPendientesDatos(self, nombre_proc, parametros=None):       
        try:
            with connection.cursor() as cursor:
                if parametros:
                    placeholders = ",".join(["%s"] * len(parametros))
                    sql = f"EXEC {nombre_proc} {placeholders}"
                    cursor.execute(sql, parametros)
                else:
                    cursor.execute(f"EXEC {nombre_proc}")
                
                columnas = [col[0] for col in cursor.description]
                filas = cursor.fetchall()
                return [dict(zip(columnas, fila)) for fila in filas]
        except Exception as ex:         
            return [{"Error": f"Error ejecutando procedimiento '{nombre_proc}': {ex}"}]
        
     def ControlCalidadInscripcionDatos(self, nombre_proc, parametros=None):       
        try:
            with connection.cursor() as cursor:
                if parametros:
                    placeholders = ",".join(["%s"] * len(parametros))
                    sql = f"EXEC {nombre_proc} {placeholders}"
                    cursor.execute(sql, parametros)
                else:
                    cursor.execute(f"EXEC {nombre_proc}")
                
                columnas = [col[0] for col in cursor.description]
                filas = cursor.fetchall()
                return [dict(zip(columnas, fila)) for fila in filas]
        except Exception as ex:    
            return [{"Error": f"Error ejecutando procedimiento '{nombre_proc}': {ex}"}]
      
     def ListarIngresoInscripcionesDatos(self, nombre_proc):       
        try:
            with connection.cursor() as cursor:
                cursor.execute(f"EXEC {nombre_proc}")
                columnas = [col[0] for col in cursor.description]
                filas = cursor.fetchall()
                return [dict(zip(columnas, fila)) for fila in filas]
        except Exception as ex:           
            return [{"Error": f"Error ejecutando procedimiento '{nombre_proc}': {ex}"}]
        
     def BuscarDevolucionesDatos(self, nombre_proc, parametros=None):       
        try:
            with connection.cursor() as cursor:
                if parametros:
                    placeholders = ",".join(["%s"] * len(parametros))
                    sql = f"EXEC {nombre_proc} {placeholders}"
                    cursor.execute(sql, parametros)
                else:
                    cursor.execute(f"EXEC {nombre_proc}")
                
                columnas = [col[0] for col in cursor.description]
                filas = cursor.fetchall()
                return [dict(zip(columnas, fila)) for fila in filas]
        except Exception as ex:
             return [{"Error": f"Error ejecutando procedimiento '{nombre_proc}': {ex}"}]
        
     def ListarNotaInscripcionDatos(self, nombre_proc, parametros=None):
        try:
            with connection.cursor() as cursor:
                if parametros:
                    placeholders = ",".join(["%s"] * len(parametros))
                    sql = f"EXEC {nombre_proc} {placeholders}"
                    cursor.execute(sql, parametros)
                else:
                    cursor.execute(f"EXEC {nombre_proc}")
                
                columnas = [col[0] for col in cursor.description]
                filas = cursor.fetchall()
                return [dict(zip(columnas, fila)) for fila in filas]
        except Exception as ex:          
            return [{"Error": f"Error ejecutando procedimiento '{nombre_proc}': {ex}"}]
        
     def ListarApuntesInscripcionDatos(self, nombre_proc, parametros=None):
        try:
            with connection.cursor() as cursor:
                if parametros:
                    placeholders = ",".join(["%s"] * len(parametros))
                    sql = f"EXEC {nombre_proc} {placeholders}"
                    cursor.execute(sql, parametros)
                else:
                    cursor.execute(f"EXEC {nombre_proc}")
                
                columnas = [col[0] for col in cursor.description]
                filas = cursor.fetchall()
                return [dict(zip(columnas, fila)) for fila in filas]
        except Exception as ex:           
            return [{"Error": f"Error ejecutando procedimiento '{nombre_proc}': {ex}"}]
        
     def BuscarComproFacturaDatos(self, nombre_proc, parametros=None):
        try:
            with connection.cursor() as cursor:
                if parametros:
                    placeholders = ",".join(["%s"] * len(parametros))
                    sql = f"EXEC {nombre_proc} {placeholders}"
                    cursor.execute(sql, parametros)
                else:
                    cursor.execute(f"EXEC {nombre_proc}")
                
                columnas = [col[0] for col in cursor.description]
                filas = cursor.fetchall()
                return [dict(zip(columnas, fila)) for fila in filas]
        except Exception as ex:
            return [{"Error": f"Error ejecutando procedimiento '{nombre_proc}': {ex}"}]
    
     def BuscarApuntesDatos(self, nombre_proc, parametros=None):
        try:
            with connection.cursor() as cursor:
                if parametros:
                    placeholders = ",".join(["%s"] * len(parametros))
                    sql = f"EXEC {nombre_proc} {placeholders}"
                    cursor.execute(sql, parametros)
                else:
                    cursor.execute(f"EXEC {nombre_proc}")
                
                columnas = [col[0] for col in cursor.description]
                filas = cursor.fetchall()
                return [dict(zip(columnas, fila)) for fila in filas]
        except Exception as ex:
            return [{"Error": f"Error ejecutando procedimiento '{nombre_proc}': {ex}"}]
         

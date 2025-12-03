from django.db import connection

class ListarFoliosDatos:
     

     def ListarFolioDatos(self, nombre_proc, parametros=None):       
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
        
    
     def ActualizarFoliosDatos(self, nombre_proc, parametros=None):       
        try:
           
            with connection.cursor() as cursor:
                if parametros:
                    placeholders = ",".join(["%s"] * len(parametros))
                    sql = f"EXEC {nombre_proc} {placeholders}"
                    cursor.execute(sql, parametros)
                else:
                    cursor.execute(f"EXEC {nombre_proc}")  
                datos = [{"exito": 1, "mensaje": "Actualización realizada correctamente"}]
                datos_list = [dict(row) for row in datos] 
                #filas = cursor.fetchall()
                return datos_list
        except Exception as ex:         
            return [{"Error": f"Error ejecutando procedimiento {nombre_proc}" ,"exito": 0}]
            
        
    
        


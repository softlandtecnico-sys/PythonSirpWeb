from django.db import connection

class UsuarioDatos:
     
     def ValidarUsuarioNombreDatos(self, nombre_proc, parametros=None):       
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
            return [{"mensaje": f"Error ejecutando procedimiento '{nombre_proc}","Id_Usuario": 0,}]

     def BuscarUsuarioDatos(self, nombre_proc, parametros=None):       
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
            return [{"mensaje": f"Error ejecutando procedimiento '{nombre_proc}","Id_Usuario": 0,}]
        
     def GuardaUsuarioDatos(self, nombre_proc, parametros=None):       
        try:
          
            with connection.cursor() as cursor:
                if parametros:
                    placeholders = ",".join(["%s"] * len(parametros))
                    sql = f"EXEC {nombre_proc} {placeholders}"
                    cursor.execute(sql, parametros)
                else:
                    cursor.execute(f"EXEC {nombre_proc}")  
                datos = [{"exito": 1, "mensaje": "Usuario registrado correctamente"}]
                datos_list = [dict(row) for row in datos]          
                return datos_list
        except Exception as ex:         
            return [{"Error": f"Error ejecutando procedimiento {nombre_proc}" ,"exito": 0}]
        
        
     def ActualizarUsuarioDatos(self, nombre_proc, parametros=None):       
        try:
         
            with connection.cursor() as cursor:
                if parametros:
                    placeholders = ",".join(["%s"] * len(parametros))
                    sql = f"EXEC {nombre_proc} {placeholders}"
                    cursor.execute(sql, parametros)
                else:
                    cursor.execute(f"EXEC {nombre_proc}")  
                datos = [{"exito": 1, "mensaje": "Usuario Actualizado correctamente"}]
                datos_list = [dict(row) for row in datos]          
                return datos_list
        except Exception as ex:         
            return [{"Error": f"Error ejecutando procedimiento {nombre_proc}" ,"exito": 0}]
    
     def ListarRolParaUsuariosDatos(self, nombre_proc):       
        try:
            with connection.cursor() as cursor:
                cursor.execute(f"EXEC {nombre_proc}")
                columnas = [col[0] for col in cursor.description]
                filas = cursor.fetchall()
                return [dict(zip(columnas, fila)) for fila in filas]
        except Exception as ex:
         return [{"mensaje": f"Error ejecutando procedimiento {nombre_proc}" ,"exito": 0}]
        
    
     def ListarUsuariosFiltradoDatos(self, nombre_proc, parametros=None):       
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
            return [{"mensaje": f"Error ejecutando procedimiento '{nombre_proc}","Id_Usuario": 0,}]
        
     def ListarPermisosDatos(self, nombre_proc, parametros=None):       
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
            return [{"mensaje": f"Error ejecutando procedimiento '{nombre_proc}","Id_Usuario": 0,}]
   
        
     def MostrarTipoUsuarioDatos(self, nombre_proc):       
        try:
            with connection.cursor() as cursor:
                cursor.execute(f"EXEC {nombre_proc}")
                columnas = [col[0] for col in cursor.description]
                filas = cursor.fetchall()
                return [dict(zip(columnas, fila)) for fila in filas]
        except Exception as ex:
         return [{"mensaje": f"Error ejecutando procedimiento {nombre_proc}" ,"exito": 0}]
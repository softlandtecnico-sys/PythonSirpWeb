from django.db import connection
class AuditoriaDatos:
    
    def GuardarAuditoriaDatos(self, nombre_proc, parametros=None):       
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
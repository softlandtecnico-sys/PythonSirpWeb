import configparser
import os
from Aplicaciones.Global.Utils.encriptador import Encriptador

class ConfigBase:

    def Mid(texto: str, start: int, length: int = None):
        if start <= 0:
         raise ValueError("Start debe ser mayor que 0 (base 1, como en VB.NET)")    
    # Convertir a índice base 0
        start_index = start - 1    
        if length is None:    
            return texto[start_index:]
        else:
            return texto[start_index:start_index + length]
    

    def leer_archivo(nombre_linea: str):
     nombre = ""
     BASE_DIR = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
     nombre_archivo = os.path.join(BASE_DIR, "ConfigBase", "Softland.cfg")
     config = configparser.ConfigParser()
     config.read(nombre_archivo)
     try:
            with open(nombre_archivo, "r", encoding="utf-8") as archivo:
                for linea in archivo:
            
                    # Busca si la línea contiene el texto buscado
                    inicio = linea.find(nombre_linea)
                    inicio = 1          
                    if inicio > 0:                       
                        valor = ConfigBase.Mid(linea, inicio + len(nombre_linea), 100)                      
                        nombre = Encriptador.des_encriptar_cadena(valor)           
            return nombre
     except Exception as ex:
            print(f"Error: {ex}")  # En VB se mostraba MessageBox
            return nombre
    

    
     @property
     def tipo_base_datos(self) -> str:
        return self.leer_archivo("TIPOBASE: ")

    @property
    def nombre_servidor(self) -> str:
        return self.leer_archivo("SERVIDOR: ")

    @property
    def nombre_base_datos(self) -> str:
        return self.leer_archivo("BASE: ")

    @property
    def nombre_usuario(self) -> str:
        return self.leer_archivo("USER: ")

    @property
    def password_base(self) -> str:
        return self.leer_archivo("PASSWORD: ")

    @property
    def carpeta_compartida(self):

        return ConfigBase.leer_archivo("CARPETA: ")

    @property
    def ip(self) -> str:
        return self.leer_archivo("IP: ")

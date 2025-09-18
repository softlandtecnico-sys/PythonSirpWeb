import configparser
import os
import re
from Aplicaciones.Global.Utils.encriptador import Encriptador

class ConfigBase:

  
    

    def leer_archivo(nombre_linea: str):
     nombre = ""
     BASE_DIR = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
     nombre_archivo = os.path.join(BASE_DIR, "ConfigBase", "Softland.cfg")
     config = configparser.ConfigParser()
     config.read(nombre_archivo)
     try:
            with open(nombre_archivo, "r", encoding="utf-8") as archivo:
                    for linea in archivo:
                        if linea.strip().startswith(nombre_linea):    
                         nombre = Encriptador.des_encriptar_cadena(linea.replace(nombre_linea, "").strip())                    
                         return nombre
     except Exception as ex:
            print(f"Error: {ex}")  # En VB se mostraba MessageBox
            return nombre
    

    
     @property
     def tipo_base_datos(self):
        return ConfigBase.leer_archivo("TIPOBASE: ")

    @property
    def nombre_servidor(self):
        return ConfigBase.leer_archivo("SERVIDOR: ")

    @property
    def nombre_base_datos(self):
        return ConfigBase.leer_archivo("BASE: ")

    @property
    def nombre_usuario(self):
        return ConfigBase.leer_archivo("USER: ")

    @property
    def password_base(self):
        return ConfigBase.leer_archivo("PASSWORD: ")

    @property
    def carpeta_compartida(self):

        return ConfigBase.leer_archivo("CARPETA: ")

    @property
    def ip(self):
        return ConfigBase.leer_archivo("IP: ")

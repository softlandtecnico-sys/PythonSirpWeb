class Encriptador:
    patron_busqueda = "VqHIñzAiZCvyn5aNx6hQTepKtJRw23ÑEbLuY9FWjPBg4O1scM08DdXrmU7fGloSk"
    patron_encripta = "N1LBIXwKZtFg7qU3ñykcCVY5MQuSaA82i0h9lprvj4OToRmzÑPesGEJxDHW6ndfb"

    @staticmethod
    def encriptar_cadena(cadena: str):
        print(cadena)
        if cadena:
            resultado = ""
            for idx, caracter in enumerate(cadena):
                resultado += Encriptador.encriptar_caracter(caracter, len(cadena), idx)
            return resultado
        
    @staticmethod
    def encriptar_caracter(caracter: str, variable: int, a_indice: int):
        if caracter in Encriptador.patron_busqueda:         
            indice = (Encriptador.patron_busqueda.index(caracter) + variable + a_indice) % len(Encriptador.patron_busqueda)
            return Encriptador.patron_encripta[indice]
        return caracter

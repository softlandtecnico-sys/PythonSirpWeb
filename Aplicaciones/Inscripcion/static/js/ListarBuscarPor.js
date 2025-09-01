import { getCookieL } from "./Token.js";

$(document).ready(function () {
    ListarPor();
});
async function ListarPor(){  

        fetch("/inscripcion/ListarBuscarPor/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-CSRFToken": getCookieL('csrftoken') // Obligatorio para POST en Django
            },         
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                console.log(JSON.stringify(data, null, 2));
                var datos = data;
                if (datos.length > 0) {
                       select  = document.getElementById("buscarPor");     
                        for (let recorrer=0; recorrer<datos.length;recorrer++  )
                        {
                            let option = document.createElement("option");
                            option.value = datos[recorrer].Cod_Consulta;   
                            option.text = datos[recorrer].Nombre;       
                            select.appendChild(option);
                         }                                
                 
                }
                else {
                    Swal.fire({
                        position: 'top-end',
                        icon: 'info',
                        title: 'Credenciales incorrectos',
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            })
    .catch(err => {
    console.log("Ocurrió un error:", err);
   
});
   
} 
function getCookieL(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== "") {
        const cookies = document.cookie.split(';');
        for (let cookie of cookies) {
            cookie = cookie.trim();
            if (cookie.substring(0, name.length + 1) === (name + "=")) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}
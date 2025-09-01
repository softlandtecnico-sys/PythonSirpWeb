$(document).ready(function () {
    consultarDate();
   $("#idsinControlInscripcion").click(function() {       
      ListarAsignacionCalidad();
    });
  $("#idcontrolInscripcion").click(function() {       
      ListarAsignacionCalidad();
    });
     $("#fechaInicio").on("change", function () {
      ListarAsignacionCalidad();
    });
    $("#fechaFin").on("change", function () {
      ListarAsignacionCalidad();
    });
});
let datos;
function consultarDate()
{
    let hoy = new Date().toISOString().split('T')[0]; 
    $("#fechaInicio").val(hoy);
    $("#fechaFin").val(hoy);

}
function ListarAsignacionCalidad()
{
    var estado=1;
    if ($("#idsinControlInscripcion").is(":checked")) {
        estado=2;
    }
      parameter0= $("#fechaInicio").val();
      parameter1= $("#fechaFin").val();
     fetch("/inscripcion/ListarAsignacionCalidad/", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "X-CSRFToken": getCookieL('csrftoken') // Obligatorio para POST en Django
        },
        body: JSON.stringify({
            param0: estado,
            param1: parameter0,
            param2: parameter1,
            param3: "1"
        })
    })
        .then(res => res.json())
        .then(data => {
            datos = data;
            if (datos.length > 0) {  
                console.log(datos);
                    if(datos.length === 1 && datos[0].Id === 0)
                    {       
                               elimnar_todo_filas("TableControlCalidadInsc")  
                                Swal.fire({
                                position: 'top-end',
                                icon: 'info',
                                title: datos[0].mensaje,
                                showConfirmButton: false,
                                timer: 1500
                            });
                    }
                    else{
                         llenar_tabla_ListarAsignacionCalidad(datos);  
                    }
                    
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

function llenar_tabla_ListarAsignacionCalidad(datos) {
    elimnar_todo_filas("TableControlCalidadInsc")  
    let contadorFila = 0;
    for (let recorrer = 0; recorrer < datos.length; recorrer++) {
        contadorFila++;
        $("<tr><td><button class='btn btn-primary me-2 mb-2' onclick='consultarRevisionOrden(\"" + datos[recorrer].IdComprobante  + "\",\"" + datos[recorrer].No_Comprobate + "\")'>Realizar Control de Calidad</button></td><td class='td-texto' style='display: none;'>" + contadorFila + "</td><td class='td-texto' style='display: none;'> " + datos[recorrer].Id + " </td><td class='td-texto'> " + datos[recorrer].IdComprobante + " </td><td class='td-texto'> " + datos[recorrer].Id_InscriFicha + " </td><td class='td-texto'>" + datos[recorrer].NombreAsignado + "</td><td class='td-texto'>" + datos[recorrer].IdUsuario + "</td></tr>").appendTo('#TableControlCalidadInsc');
    }
}
function elimnar_todo_filas(id) {
    if (document.getElementById(id).rows.length >= 1) {
        for (var i = document.getElementById(id).rows.length - 1; i > 0; i--) {
            document.getElementById(id).deleteRow(i);
            if (parseInt(document.getElementById(id).rows.length) === 1) {
                return true;
            }
        }
    }
}
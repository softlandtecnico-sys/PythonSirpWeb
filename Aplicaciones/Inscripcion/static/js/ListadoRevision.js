
$(document).ready(function () {
    if ($("#porRevisar").is(":checked")) {
        ListadoRevision("0");
    }
    $("#porRevisar").change(function () {
        if ($("#porRevisar").is(":checked")) {
            ListadoRevision("0")
        }
    });
    $("#noProcesado").change(function () {
        if ($(this).is(":checked")) {
            ListadoRevision("1")
        }
    });
});

async function ListadoRevision(parametro) {

    fetch("/inscripcion/ListadoRevision/", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "X-CSRFToken": getCookieL('csrftoken') // Obligatorio para POST en Django
        },
        body: JSON.stringify({
            param0: parametro

        })
    })
        .then(res => res.json())
        .then(data => {
            var datos = data;
            if (datos.length > 0) {
       
                llenar_tabla_orden(datos);
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
function consultarRevisionOrden(parameter0, parameter1){
alert(parameter0);
}
function llenar_tabla_orden(datos) {
    elimnar_todo_filas("TListarRevision")
    let contadorFila = 0;
    for (let recorrer = 0; recorrer < datos.length; recorrer++) {
        contadorFila++;
        $("<tr><td><button class='btn btn-primary me-2 mb-2' onclick='consultarRevisionOrden(\"" + datos[recorrer].IdComprobante  + "\",\"" + datos[recorrer].No_Comprobate + "\")'>Selecionar</button></td><td class='td-texto' style='display: none;'>" + contadorFila + "</td><td class='td-texto' style='display: none;'> " + datos[recorrer].IdComprobante + " </td><td class='td-texto'> " + datos[recorrer].Registro + " </td><td class='td-texto'> " + datos[recorrer].No_Comprobate + " </td><td class='td-texto'>" + datos[recorrer].No_Doc + "</td><td class='td-texto'>" + datos[recorrer].Concepto + "</td><td class='td-texto'>" + datos[recorrer].AFavor + "</td><td class='td-texto'>" + datos[recorrer].ValorPagar + "</td><td class='td-texto'>" + datos[recorrer].Repertorio + "</td><td class='td-texto'>" + datos[recorrer].Fecha + "</td><td class='td-texto'>" + datos[recorrer].Cuantia + "</td><td class='td-texto'>" + datos[recorrer].FechaEntrega + "</td><td class='td-texto'>" + datos[recorrer].Estado + "</td><td class='td-texto'>" + datos[recorrer].CantidadTotal + "</td><td class='td-texto' style='display: none;'>" + datos[recorrer].Id_Usuario + "</td><td class='td-texto' style='display: none;'>" + "" + "</td></tr>").appendTo('#TListarRevision');
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
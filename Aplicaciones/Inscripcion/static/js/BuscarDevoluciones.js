$(document).ready(function () {
    $("#BuscarDevoluciones").click(function () {
        BuscarDevoluciones();
    });

});

async function BuscarDevoluciones() {
    var mestado = "A";
    var mBuscar;
    const combo = document.getElementById("buscarPorDevoluciones");
    const pConsulta = combo.value;
    let valor = $("#textBusquedaD").val().trim();
    let resultado = ("000000" + valor).slice(-6);
    if ($("#devolucionespPro").is(":checked")) { mestado = "I"; }
    if (pConsulta == 0) {
        mBuscar = $("#ComboboxDevolucionesanio option:selected").text();
    }
    else if (pConsulta == 1) {
        if (valor !== "") {
            if ($("#devolucionesMercantil").is(":checked")) {
                mBuscar = "21" + $("#ComboboxDevolucionesanio option:selected").text() + resultado;
            }
            else {
                mBuscar = "11" + $("#ComboboxDevolucionesanio option:selected").text() + resultado;
            }
        }
    }
    else {
        mBuscar = valor;
    }
    fetch("/inscripcion/BuscarDevoluciones/", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "X-CSRFToken": getCookieL('csrftoken') // Obligatorio para POST en Django
        },
        body: JSON.stringify({
            param0: pConsulta,
            param1: mestado,
            param2: mBuscar
        })
    })
        .then(res => res.json())
        .then(data => {
            var datos = data;
            if (datos.length > 0) {
                if (datos.length === 1 && datos[0].Id_Inscripcion === 0) {
                     elimnar_todo_filasDevo("TableBuscarDevoluciones")
                    Swal.fire({
                        position: 'top-end',
                        icon: 'info',
                        title: datos[0].mensaje,
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
                else {
                    llenar_tabla_ordenDevo(datos);
                }
            }
            else {
                Swal.fire({
                    position: 'top-end',
                    icon: 'info',
                    title: 'Error',
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
function llenar_tabla_ordenDevo(datos) {
    elimnar_todo_filasDevo("TableBuscarDevoluciones")
    let contadorFila = 0;
    for (let recorrer = 0; recorrer < datos.length; recorrer++) {
        contadorFila++;
        $("<tr><td><button class='btn btn-primary me-2 mb-2' onclick='ArchivoDocNDCertificado(\"" + datos[recorrer].Id_Inscripcion + "\")'><i class='bi bi-eye'></i> Ver</button></td><td class='td-texto' style='display: none;'>" + contadorFila + "</td><td class='td-texto'> " + datos[recorrer].Id_Inscripcion + " </td><td class='td-texto'> " + datos[recorrer].Tipo + " </td><td class='td-texto'> " + datos[recorrer].No_Comprobate + " </td><td class='td-texto'> " + datos[recorrer].FechaRevision + " </td><td class='td-texto'>" + datos[recorrer].No_Repertorio + "</td><td class='td-texto'>" + datos[recorrer].ElaboradoPor + "</td><td class='td-texto'>" + datos[recorrer].AFavor + "</td><td class='td-texto'>" + datos[recorrer].Cliente + "</td><td class='td-texto'>" + datos[recorrer].SolicitadoPor + "</td><td class='td-texto'>" + datos[recorrer].Estado + "</td><td class='td-texto'>" + datos[recorrer].IdComprobante + "</td></tr>").appendTo('#TableBuscarDevoluciones');
    }
}
function ArchivoDocNDCertificado(param0Entrada){
    fetch("/inscripcion/ArchivoDocNDCertificado/", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "X-CSRFToken": getCookieL('csrftoken') // Obligatorio para POST en Django
        },
        body: JSON.stringify({
            param0: param0Entrada
        })
    })
        .then(res => res.json())
        .then(data => {
            var datos = data;
            if (datos.length > 0) {
                if (datos.length === 1 && datos[0].Id_Inscripcion === 0) {
                     elimnar_todo_filasDevo("TableBuscarDevoluciones")
                    Swal.fire({
                        position: 'top-end',
                        icon: 'info',
                        title: datos[0].mensaje,
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
                else {
                    llenar_tabla_ordenDevo(datos);
                }
            }
            else {
                Swal.fire({
                    position: 'top-end',
                    icon: 'info',
                    title: 'Error',
                    showConfirmButton: false,
                    timer: 1500
                });
            }
        })
        .catch(err => {
            console.log("Ocurrió un error:", err);

        });

}
function elimnar_todo_filasDevo(id) {
    if (document.getElementById(id).rows.length >= 1) {
        for (var i = document.getElementById(id).rows.length - 1; i > 0; i--) {
            document.getElementById(id).deleteRow(i);
            if (parseInt(document.getElementById(id).rows.length) === 1) {
                return true;
            }
        }
    }
}

$(document).ready(function () {
    $("#BuscarOrdenPrelacion").click(function () {

        MostrarOrdenesPendientes();

    });
});


async function MostrarOrdenesPendientes() {

    const combo = document.getElementById("buscarPor");
    const parameter0 = combo.value;
    var parameter1 = $("#textOrdenPrelacion").val();

    fetch("/inscripcion/MostrarOrdenesPendientes/", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "X-CSRFToken": getCookieL('csrftoken') // Obligatorio para POST en Django
        },
        body: JSON.stringify({
            param0: parameter0,
            param1: parameter1
        })
    })
        .then(res => res.json())
        .then(data => {
            var datos = data;
            if (datos.length > 0) {
                if (datos.length === 1 && datos[0].No_Comprobate === 0) {
                    elimnar_todo_filas("TableOrdenesPendientes")
                    Swal.fire({
                        position: 'top-end',
                        icon: 'info',
                        title: datos[0].mensaje,
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
                else {
                    llenar_tabla_ordenPendiente(datos);
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
function llenar_tabla_ordenPendiente(datos) {
    elimnar_todo_filas("TableOrdenesPendientes")
    let contadorFila = 0;
    for (let recorrer = 0; recorrer < datos.length; recorrer++) {
        contadorFila++;
        $("<tr><td class='td-texto' style='display: none;'>" + contadorFila + "</td><td class='td-texto'> " + datos[recorrer].No_Comprobate + " </td><td class='td-texto'> " + datos[recorrer].AFavor + " </td><td class='td-texto'> " + datos[recorrer].Concepto + " </td><td class='td-texto'>" + datos[recorrer].Fecha + "</td><td class='td-texto'>" + datos[recorrer].Hora + "</td><td class='td-texto'>" + datos[recorrer].No_Repertorio + "</td><td class='td-texto'>" + datos[recorrer].Secuencia + "</td></tr>").appendTo('#TableOrdenesPendientes');
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
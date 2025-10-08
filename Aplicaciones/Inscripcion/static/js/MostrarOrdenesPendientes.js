
$(document).ready(function () {
    $("#BuscarOrdenPrelacion").click(function () {

        MostrarOrdenesPendientes();

    });
});


async function MostrarOrdenesPendientes() {
    const combo = document.getElementById("buscarPor");
    const parameter0 = combo.value;
    const parameter1 = $("#textOrdenPrelacion").val();

    try {
      
        Swal.fire({
            title: 'Cargando órdenes pendientes...',
            text: 'Por favor espere mientras se obtienen los datos.',
            allowOutsideClick: false,
            didOpen: () => {
                Swal.showLoading();
            }
        });     
        const response = await fetch("/inscripcion/MostrarOrdenesPendientes/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-CSRFToken": getCookieL('csrftoken') 
            },
            body: JSON.stringify({
                param0: parameter0,
                param1: parameter1
            })
        });
        const datos = await response.json();  
        Swal.close(); 
        if (datos.length > 0) {
            if (datos.length ===1  && Number(datos[0].exito) === 0) {
                 Swal.fire({
                    position: 'top-end',
                    icon: 'info',
                    title: datos[0].mensaje,
                    showConfirmButton: false,
                    timer: 1500
                });
                elimnar_todo_filas("TableOrdenesPendientes");
               
            } else {
                llenar_tabla_ordenPendiente(datos);
            }
        } else {
            Swal.fire({
                position: 'top-end',
                icon: 'info',
                title: 'No se encontraron resultados',
                showConfirmButton: false,
                timer: 1500
            });
        }

    } catch (err) {
        Swal.close();
        console.error("Ocurrió un error:", err);
        Swal.fire({
            icon: 'error',
            title: 'Error al obtener las órdenes pendientes',
            text: err.message
        });
    }
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
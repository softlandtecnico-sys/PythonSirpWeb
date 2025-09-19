
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
    $("#idBuscarDoc").click(function () {
        ObtenerDocumentoInscripcion();
    });
     $("#idBuscarDocDevolutiva").click(function () {
        ObtenerArchivoDocTramiteDevuelto();
    });
   
     $("#idnotasInscripcion").click(function () {
        mostrarModal();
    });
    $("#idcerraModal").click(function () {
        ocultarModal();
    });

const modal = document.getElementById('notasModal');
 const header = document.getElementById('modalHeader');
 let isDragging = false;
  let offsetX = 0;
  let offsetY = 0;

  header.addEventListener("mousedown", (e) => {
    isDragging = true;
    offsetX = e.clientX - modal.offsetLeft;
    offsetY = e.clientY - modal.offsetTop;
    modal.style.transform = "none"; // Desactiva el centrado automático
    document.body.style.userSelect = "none"; // Evita seleccionar texto al arrastrar
  });

  document.addEventListener("mousemove", (e) => {
    if (isDragging) {
      modal.style.left = e.clientX - offsetX + "px";
      modal.style.top = e.clientY - offsetY + "px";
    }
  });

  document.addEventListener("mouseup", () => {
    isDragging = false;
    document.body.style.userSelect = "auto";
  });
});

var parametroConsulta="";

function mostrarModal(){
document.getElementById('notasModal').style.display="block";
    
}
function ocultarModal()
{
document.getElementById('notasModal').style.display="none";

}

async function ListadoRevision(parametroConsultaEntrada) {

    fetch("/inscripcion/ListadoRevision/", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "X-CSRFToken": getCookieL('csrftoken') // Obligatorio para POST en Django
        },
        body: JSON.stringify({
            param0: parametroConsultaEntrada

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
function ObtenerArchivoDocTramiteDevuelto()
{
    fetch("/inscripcion/ArchivoDocTramiteDevuelto/", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "X-CSRFToken": getCookieL('csrftoken') // Obligatorio para POST en Django
        },
        body: JSON.stringify({
            param0: parametroConsulta
        })
    })
        .then(res => res.json())
        .then(data => {
            var datos = data;
            if (datos.length > 0) {
                if (datos[0].mensaje === 1) {
                    const pdfBase64 = data[0].archivo_base64;
                    const byteCharacters = atob(pdfBase64);
                    const byteNumbers = new Array(byteCharacters.length);
                    for (let i = 0; i < byteCharacters.length; i++) {
                        byteNumbers[i] = byteCharacters.charCodeAt(i);
                    }
                    const byteArray = new Uint8Array(byteNumbers);
                    const blob = new Blob([byteArray], { type: "application/pdf" });
                    const pdfUrl = URL.createObjectURL(blob);
                    window.open(pdfUrl, "_blank");

                }
                else if(Number(datos[0].mensaje) === 0)
                    {
                    Swal.fire({
                    position: 'top-end',
                    icon: 'info',
                    title: 'No se encuentra el documento',
                    showConfirmButton: false,
                    timer: 1500});
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
function ObtenerDocumentoInscripcion()
{
    fetch("/inscripcion/ArchivoDocTramiteInscripcion/", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "X-CSRFToken": getCookieL('csrftoken') // Obligatorio para POST en Django
        },
        body: JSON.stringify({
            param0: parametroConsulta
        })
    })
        .then(res => res.json())
        .then(data => {
            var datos = data;
            if (datos.length > 0) {
                if (datos[0].mensaje === 1) {
                    const pdfBase64 = data[0].archivo_base64;
                    const byteCharacters = atob(pdfBase64);
                    const byteNumbers = new Array(byteCharacters.length);
                    for (let i = 0; i < byteCharacters.length; i++) {
                        byteNumbers[i] = byteCharacters.charCodeAt(i);
                    }
                    const byteArray = new Uint8Array(byteNumbers);
                    const blob = new Blob([byteArray], { type: "application/pdf" });
                    const pdfUrl = URL.createObjectURL(blob);
                    window.open(pdfUrl, "_blank");

                }
                else if(datos[0].mensaje === 0)
                    {
                    Swal.fire({
                    position: 'top-end',
                    icon: 'info',
                    title: 'No se encuentra el documento',
                    showConfirmButton: false,
                    timer: 1500});
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
function consultarRevisionOrden(parameter0, parameter1){
    
    parametroConsulta=parameter0;

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

$(document).ready(function () {
    $("#idElavorarRevision").click(function () {
        ProcederRevision();
    });

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
        ListarNota();
    });
    $("#idcerraModal").click(function () {
        ocultarModal('notasModal');
    });
    $("#idapuntesInscripcion").click(function () {
        ListarApuntes();
    });
    $("#idAgregarApuntes").click(function () {
        AgregarApuntes();
    });
    $("#idAgregarNotas").click(function () {
        AgregarNotas();
    });

    $("#idBuscarComprobante").click(function () {
        BuscarComproFactura();
    });
    $("#idApuntescerraModal").click(function () {
        ocultarModal('apuntesModal');
    });
    $("#idAutocerraModal").click(function () {
        ocultarModal('idautorizacionModal');
    });
    $("#idComprobanteCerrar").click(function () {
        ocultarModal('idModalComprobante');
    });
    $("#idComprobanteCerrar").click(function () {
        ocultarModal('idModalComprobante');
    });
    $("#idAutorizar").click(function () {
        ValidaCredencialNombre();
    });


    // Llamas la función para cada modal que tengas
    hacerModalArrastrable("notasModal", "modalHeader");
    hacerModalArrastrable("apuntesModal", "apuntesHeader");
    hacerModalArrastrable("idModalComprobante", "comprobantetesHeader");
    hacerModalArrastrable("idautorizacionModal", "autorizacionHeader");


});

var parametroConsulta = "";
let idfila = 0;
let autorizacion = 0;
function ValidaCredencialNombre() {
    const idSelectAutorizador = document.getElementById("idSelectAutorizador");
    const ObteneridSelectAutorizador = idSelectAutorizador.options[idSelectAutorizador.selectedIndex].text;;
    var param0 = ObteneridSelectAutorizador;
    var param1 = document.getElementById("idClaveAutorizacion").value;
    if (param0.trim().length > 0 && param1.trim().length > 0) {
        fetch("/inscripcion/ValidarUsuarioNombre/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-CSRFToken": getCookieL('csrftoken') // Obligatorio para POST en Django
            },
            body: JSON.stringify({
                param0: param0,
                param1: param1

            })
        })
            .then(res => res.json())
            .then(data => {
                var datos = data;
                if (datos.length > 0) {

                    if (Number(datos[0].Id_Usuario) > 0) {

                        autorizacion = 1;
                        document.getElementById('idautorizacionModal').style.display = "none";
                        document.getElementById('idClaveAutorizacion').value = "";
                        Swal.fire({
                            position: 'top-end',
                            icon: 'success',
                            title: 'Autorizado correctamente',
                            showConfirmButton: false,
                            timer: 1500
                        });
                    }
                    else if (Number(datos[0].Id_Usuario) === 0) {
                        autorizacion = 0;
                        Swal.fire({
                            position: 'top-end',
                            icon: 'info',
                            title: datos[0].mensaje,
                            showConfirmButton: false,
                            timer: 1500
                        });
                    }
                }
                else {
                    Swal.fire({
                        position: 'top-end',
                        icon: 'info',
                        title: 'Error de consulta',
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            })
            .catch(err => {
                console.log("Ocurrió un error:", err);
            });
    }
    else {
        Swal.fire({
            position: 'top-end',
            icon: 'info',
            title: 'Debe de llenar los campos',
            showConfirmButton: false,
            timer: 1500
        });
    }
}
function comboautorizacion() {
    try {

        fetch("/administracion/ListarUsuariosFiltrado/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-CSRFToken": getCookieL('csrftoken')
            },
            body: JSON.stringify({
                param0: "9",
                param1: "",
            })
        }).then(res => res.json())
            .then(data => {
                var datos = data;
                if (datos.length > 0) {
                    if (Number(datos[0].Id_Usuario) != 0) {
                        llenarCombobox(datos, "idSelectAutorizador");
                        document.getElementById('idautorizacionModal').style.display = "block";
                    }
                    else if (Number(datos[0].Id_Usuario) === 0) {
                        Swal.fire({
                            position: 'top-end',
                            icon: 'info',
                            title: datos[0].mensaje,
                            showConfirmButton: false,
                            timer: 1500
                        });

                    }
                }

            })
            .catch(err => {
                console.log("Ocurrió un error:", err);

            });

    } catch (err) {
        Swal.close();
        console.error("Ocurrió un error:", err);
        Swal.fire({
            icon: 'error',
            title: 'Error al consultar Tipo Usuario',
            text: err.message
        });
    }

}

function ProcederRevision() {

    if (idfila == 1) {




    }
    else {
        if (autorizacion === 0) {
            Swal.fire({
                title: 'Revisión',
                text: "No cuenta con permisos para adelantar este trámite. ¿Desea solicitar la autorización correspondiente?",
                icon: 'question',
                showCancelButton: true,
                confirmButtonText: 'Sí',
                cancelButtonText: 'No',
                reverseButtons: true  // Opcional: invierte el orden
            }).then((result) => {
                if (result.isConfirmed) {
                    comboautorizacion();
                } else if (result.dismiss === Swal.DismissReason.cancel) {
                    // ✖ NO
                    Swal.fire("Cancelado", "Elegiste No", "error");
                }
            });

        }
        else {
           autorizacion=0;
             Swal.fire({
                            position: 'top-end',
                            icon: 'success',
                            title: 'abriendo modal',
                            showConfirmButton: false,
                            timer: 1500
                        });

        }

    }


}

function llenarComproFactura(datos) {
    elimnar_todo_filas("idtableBuscarComprobante")
    let contadorFila = 0;
    for (let recorrer = 0; recorrer < datos.length; recorrer++) {
        contadorFila++;
        $("<tr><td class='td-texto' style='display: none;'>" + contadorFila + "</td><td class='td-texto'> " + datos[recorrer].Concepto + " </td><td class='td-texto'> " + datos[recorrer].Cantidad + " </td><td class='td-texto'> " + datos[recorrer].VUnitario + " </td><td class='td-texto'>" + datos[recorrer].ValorTotal + "</td></tr>").appendTo('#idtableBuscarComprobante');

    }

    if (datos[0].Discapacitado === "S") {
        document.getElementById('iddiscapacidad').checked = true;

    }
    else {
        document.getElementById('iddiscapacidad').checked = false;
    }

    if (datos[0].TerceraEdad === "S") {
        document.getElementById('idterceraEdad').checked = true;

    }
    else {
        document.getElementById('idterceraEdad').checked = false;
    }
    if (datos[0].IPublica === "S") {
        document.getElementById('entidadPublica').checked = true;

    }
    else {
        document.getElementById('entidadPublica').checked = false;
    }
    if (datos[0].TipoActo === "1") {
        document.getElementById('idtipoServicio').value = "Inscripcion";

    }
    else {
        document.getElementById('idtipoServicio').value = "Certificado";
    }
    if (datos[0].TipoRegistro === "1") {
        document.getElementById('idtipoRegistro').value = "Propiedad";

    }
    else {
        document.getElementById('idtipoRegistro').value = "Mercantil";
    }




    document.getElementById('idtextcomprobante').value = datos[0].IdComprobante;
    document.getElementById('idfechaEntega').value = datos[0].FechaEntrega;
    document.getElementById('idAfavor').value = datos[0].AFavor;
    document.getElementById('idNombreClienteRUC').value = datos[0].Cliente_CedRuc;
    document.getElementById('idNombreCliente').value = datos[0].Cliente;
    document.getElementById('idsolicitanteCed').value = datos[0].CedSolicitante;
    document.getElementById('idSolicitante').value = datos[0].SolicitadoPor;
    document.getElementById('idcuantia').value = datos[0].Cuantia;
    document.getElementById('idObserv').innerHTML = datos[0].Observaciones;
    document.getElementById('idvalortotal').innerHTML = datos[0].Total;
    document.getElementById('idModalComprobante').style.display = "block";

}
function BuscarComproFactura() {
    if (parametroConsulta.trim() != " ") {
        fetch("/inscripcion/BuscarComproFactura/", {
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

                    if (Number(datos[0].IdComprobante) != 0) {

                        llenarComproFactura(datos)

                    }
                    else if (Number(datos[0].IdComprobante) === 0) {
                        Swal.fire({
                            position: 'top-end',
                            icon: 'info',
                            title: 'El comprobante no registrados',
                            showConfirmButton: false,
                            timer: 1500
                        });
                    }
                }
                else {
                    Swal.fire({
                        position: 'top-end',
                        icon: 'info',
                        title: 'Error de consulta',
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            })
            .catch(err => {
                console.log("Ocurrió un error:", err);

            });
    }
    else {

    }
}
function AgregarNotas() {
    var idusuario = sessionStorage.getItem("Id_Usuario") ?? 1;
    var texto = limpiarTexto(document.getElementById('idNotas').value);
    if (idusuario > 0 && texto.trim().length > 0) {
        fetch("/inscripcion/AgregarNota/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-CSRFToken": getCookieL('csrftoken') // Obligatorio para POST en Django
            },
            body: JSON.stringify({
                param0: "",
                param1: parametroConsulta,
                param2: "I",
                param3: idusuario,
                param4: texto
            })
        })
            .then(res => res.json())
            .then(data => {
                if (datos.length > 0) {
                    document.getElementById('idNotas').value = "";
                    ListarNota();
                }
                else {
                    Swal.fire({
                        position: 'top-end',
                        icon: 'info',
                        title: 'Error de consulta',
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            })
            .catch(err => {
                console.log("Ocurrió un error:", err);

            });
    }

}
function AgregarApuntes() {
    var idusuario = sessionStorage.getItem("Id_Usuario") ?? 1;
    var texto = limpiarTexto(document.getElementById('idApuntes').value);
    if (idusuario > 0 && texto.trim().length > 0) {
        fetch("/inscripcion/AgregarApuntes/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-CSRFToken": getCookieL('csrftoken') // Obligatorio para POST en Django
            },
            body: JSON.stringify({
                param0: "",
                param1: parametroConsulta,
                param2: idusuario,
                param3: texto
            })
        })
            .then(res => res.json())
            .then(data => {
                var datos = data;
                let texto = "";
                if (datos.length > 0) {
                    document.getElementById('idApuntes').value = "";
                    ListarApuntes();
                }
                else {
                    Swal.fire({
                        position: 'top-end',
                        icon: 'info',
                        title: 'Error de consulta',
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            })
            .catch(err => {
                console.log("Ocurrió un error:", err);

            });
    }

}
function ListarApuntes() {
    document.getElementById('idApuntes').value = "";
    fetch("/inscripcion/ListarApuntesInscripcion/", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "X-CSRFToken": getCookieL('csrftoken') // Obligatorio para POST en Django
        },
        body: JSON.stringify({
            param1: "0",
            param1: parametroConsulta

        })
    })
        .then(res => res.json())
        .then(data => {
            var datos = data;
            let texto = "";
            if (datos.length > 0) {

                if (Number(datos[0].IdComprobante) != 0) {
                    for (let recorrer = 0; recorrer < datos.length; recorrer++) {
                        texto += datos[recorrer].Apunte + "\n\n";
                    }
                    document.getElementById('idApuntes').value = texto
                    document.getElementById('apuntesModal').style.display = "block";
                }
                else if (Number(datos[0].IdComprobante) === 0) {
                    document.getElementById('apuntesModal').style.display = "block";
                }
            }
            else {
                Swal.fire({
                    position: 'top-end',
                    icon: 'info',
                    title: 'Error de consulta',
                    showConfirmButton: false,
                    timer: 1500
                });
            }
        })
        .catch(err => {
            console.log("Ocurrió un error:", err);

        });

}
function ListarNota() {
    document.getElementById('idNotas').value = "";
    fetch("/inscripcion/ListarNotaInscripcion/", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "X-CSRFToken": getCookieL('csrftoken') // Obligatorio para POST en Django
        },
        body: JSON.stringify({
            param0: "0",
            param1: parametroConsulta,
            param2: "I"

        })
    })
        .then(res => res.json())
        .then(data => {
            var datos = data;
            let texto = "";

            if (datos.length > 0) {

                if (Number(datos[0].IdComprobante) != 0) {
                    for (let recorrer = 0; recorrer < datos.length; recorrer++) {
                        texto += datos[recorrer].Nota + "\n\n";
                    }
                    document.getElementById('idNotas').value = texto
                    document.getElementById('notasModal').style.display = "block";
                }
                else if (Number(datos[0].IdComprobante) === 0) {
                    document.getElementById('notasModal').style.display = "block";


                }
            }
            else {
                Swal.fire({
                    position: 'top-end',
                    icon: 'info',
                    title: 'Error de consulta',
                    showConfirmButton: false,
                    timer: 1500
                });
            }
        })
        .catch(err => {
            console.log("Ocurrió un error:", err);

        });


}

function ocultarModal(idPamatro) {

    document.getElementById(idPamatro).style.display = "none";
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
function ObtenerArchivoDocTramiteDevuelto() {
    fetch("/inscripcion/ArchivoDocTramiteDevuelto/", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "X-CSRFToken": getCookieL('csrftoken') // Obligatorio para POST en Django
        },
        body: JSON.stringify({
            param0: parametroConsulta,
            param1: "CarpetaHD",
            param2: "2"
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
                else if (Number(datos[0].mensaje) === 0) {
                    Swal.fire({
                        position: 'top-end',
                        icon: 'info',
                        title: 'No se encuentra el documento',
                        showConfirmButton: false,
                        timer: 1500
                    });
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
function ObtenerDocumentoInscripcion() {
    fetch("/inscripcion/ArchivoDocTramiteInscripcion/", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "X-CSRFToken": getCookieL('csrftoken') // Obligatorio para POST en Django
        },
        body: JSON.stringify({
            param0: parametroConsulta,
            param1: "CarpetaTramite",
            param2: "1"
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
                else if (datos[0].mensaje === 0) {
                    Swal.fire({
                        position: 'top-end',
                        icon: 'info',
                        title: 'No se encuentra el documento',
                        showConfirmButton: false,
                        timer: 1500
                    });
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
function consultarRevisionOrden(parameter0, parameter1) {

    parametroConsulta = parameter0;
    idfila = parameter1;

}
function llenar_tabla_orden(datos) {
    elimnar_todo_filas("TListarRevision")
    let contadorFila = 0;
    for (let recorrer = 0; recorrer < datos.length; recorrer++) {
        contadorFila++;
        $("<tr><td><button id='bnt" + contadorFila + "' class='btn btn-primary me-2 mb-2' onclick='consultarRevisionOrden(\"" + datos[recorrer].IdComprobante + "\",\"" + contadorFila + "\")'>Selecionar</button></td><td class='td-texto' style='display: none;'>" + contadorFila + "</td><td class='td-texto' style='display: none;'> " + datos[recorrer].IdComprobante + " </td><td class='td-texto'> " + datos[recorrer].Registro + " </td><td class='td-texto'> " + datos[recorrer].No_Comprobate + " </td><td class='td-texto'>" + datos[recorrer].No_Doc + "</td><td class='td-texto'>" + datos[recorrer].Concepto + "</td><td class='td-texto'>" + datos[recorrer].AFavor + "</td><td class='td-texto'>" + datos[recorrer].ValorPagar + "</td><td class='td-texto'>" + datos[recorrer].Repertorio + "</td><td class='td-texto'>" + datos[recorrer].Fecha + "</td><td class='td-texto'>" + datos[recorrer].Cuantia + "</td><td class='td-texto'>" + datos[recorrer].FechaEntrega + "</td><td class='td-texto'>" + datos[recorrer].Estado + "</td><td class='td-texto'>" + datos[recorrer].CantidadTotal + "</td><td class='td-texto' style='display: none;'>" + datos[recorrer].Id_Usuario + "</td><td class='td-texto' style='display: none;'>" + "" + "</td></tr>").appendTo('#TListarRevision');
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
function hacerModalArrastrable(modalId, headerId) {
    const modal = document.getElementById(modalId);
    const header = document.getElementById(headerId);

    if (!modal || !header) return; // seguridad: evita errores si no existe

    let isDragging = false;
    let offsetX = 0;
    let offsetY = 0;

    header.addEventListener("mousedown", (e) => {
        isDragging = true;
        offsetX = e.clientX - modal.offsetLeft;
        offsetY = e.clientY - modal.offsetTop;
        modal.style.transform = "none"; // Desactiva centrado automático
        document.body.style.userSelect = "none"; // Evita seleccionar texto
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
}

function llenarCombobox(datos, idcombox) {
    const combo = document.getElementById(idcombox);
    combo.innerHTML = "";
    combo.innerHTML = "<option value='' disabled selected>Seleccione...</option>";
    for (let recorrer = 0; recorrer < datos.length; recorrer++) {
        const option = document.createElement("option");
        option.value = datos[recorrer].Id_Usuario;        // value
        option.textContent = datos[recorrer].Nombre;  // texto visible
        combo.appendChild(option);
    }

}
function limpiarTexto(texto) {
    return texto
        .replace(/[ \t]+/g, " ")
        .replace(/\n{2,}/g, "\n")
        .trim();
}
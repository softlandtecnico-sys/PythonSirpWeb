
$(document).ready(function () {
    MostrarTipoUsuarioActu();
    ListarRolParaUsuariosActu();
    consultarU("3","0");

    $("#idGenerarClave").click(function () {
        generarClaveTemporal();
    });
    $("#idActualizarUsuario").click(function () {
        condicionUsuario();
    });
    $("#idLimpiarUsuario").click(function () {
        limpiar();
    });

    document.getElementById("idFiltrar").addEventListener("change", function() {
    const valorSeleccionado = this.value;
    if (valorSeleccionado === "0") { 
      // Aquí pones la acción para 'Todos'
     consultarU("3","0")
    } 
    else if (valorSeleccionado === "1") { 
      // Acción para 'Activos'
      consultarU("4","0")
    } 
    else if (valorSeleccionado === "2") {   
      // Acción para 'Inactivos'
      consultarU("5","0")
    }
  });

});

var id = "";

function compararclave() {
    let identi = 0;
    if (document.getElementById("idclavegenerada").value.trim() != "") {

        if (document.getElementById("idcontrasena").value.trim() === document.getElementById("idclavegenerada").value.trim()) {

            identi = 1;
        }
        else {
            identi = 2;
        }
    } if (document.getElementById("idclavegenerada").value.trim() == "") {
        identi = 0;

    }


    return identi;
}
async function condicionUsuario() {
    actualizarUsuario("2")

}
async function actualizarUsuario(params) {
    let idcond = compararclave();
    try {
        if (id != "") {
            if (idcond === 1 || idcond === 0) {

                const idTipoUsuarioAc = document.getElementById("idTipoUsuarioActu");
                const ObteneridTipoUsuarioAc = idTipoUsuarioAc.value;
                const idRolUsuarioAc = document.getElementById("idRolUsuarioActu");
                const ObteneridRolUsuarioAc = idRolUsuarioAc.value;
                const idEstado = document.getElementById("idRolEstadoActu");
                const ObidEstado = idEstado.value;
                var estado = "I";
                var revisor = "N";
                if (ObidEstado === "0") {
                    estado = "A";
                }
                const idRevisor = document.getElementById("idRevisorActu");
                const ObidRevisor = idRevisor.value;

                if (ObidRevisor === "0") {
                    revisor = "S";
                }

                fetch("/administracion/ActualizarUsuario/", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "X-CSRFToken": getCookieUsuariosActu('csrftoken')
                    },
                    body: JSON.stringify({
                        param0: params,
                        param1: id,
                        param2: document.getElementById("nombreCompleto").value,
                        param3: ObteneridTipoUsuarioAc,
                        param4: document.getElementById("iddescripcion").value,
                        param5: document.getElementById("idcontrasena").value.trim(),
                        param6: estado,
                        param7: ObteneridRolUsuarioAc,
                        param8: revisor,

                    })
                }).then(res => res.json())
                    .then(data => {
                        var datos = data;
                        if (datos.length > 0) {
                            if (Number(datos[0].Id_Usuario) != 0) {
                                consultarU();
                                Swal.fire({
                                    position: 'top-end',
                                    icon: 'info',
                                    title: datos[0].mensaje,
                                    showConfirmButton: false,
                                    timer: 1500
                                });
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

            }
            else {
                Swal.fire({
                    position: 'top-end',
                    icon: 'info',
                    title: "Error las credenciales no son iguales",
                    showConfirmButton: false,
                    timer: 1500
                });

            }


        }
        else {
            Swal.fire({
                position: 'top-end',
                icon: 'info',
                title: "Debe de seleccionar un usuario",
                showConfirmButton: false,
                timer: 1500
            });

        }
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

function generarClaveTemporal() {
    if (Number(id) > 0) {
        const numero = Math.floor(100000 + Math.random() * 900000);
        document.getElementById("idclavegenerada").value = numero;
        document.getElementById("idcontrasena").value = numero;
    }
    else {

    }

}
function limpiar() {
    document.getElementById("idRolEstadoActu").value = "0";
    document.getElementById("idRevisorActu").value = "0";
    document.getElementById("nombreCompleto").value = "";
    document.getElementById("iddescripcion").value = "";
    document.getElementById("idcontrasena").value = "";
    document.getElementById("idclavegenerada").value = "";
    id="";

}
async function consultarU(Enparam0,Enparam1) {
    try {

        fetch("/administracion/ListarUsuariosFiltrado/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-CSRFToken": getCookieUsuariosActu('csrftoken')
            },
            body: JSON.stringify({
                param0: Enparam0,
                param1: Enparam1,
            })
        }).then(res => res.json())
            .then(data => {
                var datos = data;
                if (datos.length > 0) {
                    if (Number(datos[0].Id_Usuario) != 0) {
                        llenarTablaUsuario(datos);
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
async function MostrarTipoUsuarioActu() {
    try {

        fetch("/administracion/MostrarTipoUsuario/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-CSRFToken": getCookieUsuariosActu('csrftoken')
            },
        })
            .then(res => res.json())
            .then(data => {
                var datos = data;
                if (datos.length > 0) {
                    if (Number(datos[0].exito) != 0) {
                        llenarComboTipoUsuarioActu(datos);
                    }
                    else if (Number(datos[0].exito) === 0) {
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
async function ListarRolParaUsuariosActu() {
    try {

        fetch("/administracion/ListarRolParaUsuarios/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-CSRFToken": getCookieUsuariosActu('csrftoken')
            },
        })
            .then(res => res.json())
            .then(data => {
                var datos = data;
                if (datos.length > 0) {
                    if (Number(datos[0].exito) != 0) {
                        llenarComboRolUsuarioActu(datos);
                    }
                    else if (Number(datos[0].exito) === 0) {
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
function llenarTablaUsuario(datos) {
    elimnar_TablaUsuario("TableMantenimientoUsuario")
    let contadorFila = 0;
    for (let recorrer = 0; recorrer < datos.length; recorrer++) {
        contadorFila++;
        $("<tr><td><button class='btn btn-primary me-2 mb-2' onclick='obtnerinformacionUsuario(\"" + contadorFila + "\")'>Seleccionar</button></td><td class='td-texto' style='display: none;'>" + contadorFila + "</td><td class='td-texto' style='display: none;'> " + datos[recorrer].Id_Usuario + " </td><td class='td-texto' style='font-size: 10px;'> " + datos[recorrer].Usuario + " </td><td class='td-texto' style='font-size: 10px;'> " + datos[recorrer].Nombre + " </td><td class='td-texto' style='font-size: 10px;'>" + datos[recorrer].Tipo + "</td><td class='td-texto' style='font-size: 10px;'>" + datos[recorrer].Descripcion + "</td><td class='td-texto' style='font-size: 10px;'>" + datos[recorrer].Contraseña + "</td><td class='td-texto' style='font-size: 10px;'>" + datos[recorrer].Estado + "</td><td class='td-texto' style='font-size: 10px;'>" + datos[recorrer].Id_TipoUsuario + "</td><td class='td-texto' style='font-size: 10px;'>" + datos[recorrer].IdRolUsuario + "</td><td class='td-texto' style='font-size: 10px;'>" + datos[recorrer].Firmar + "</td></tr>").appendTo('#TableMantenimientoUsuario');
    }
}
function obtnerinformacionUsuario(contadorFila) {
    const tabla = document.getElementById("TableMantenimientoUsuario");
    for (let i = 0; i < tabla.rows.length; i++) {
        const fila = tabla.rows[i];
        if (i === Number(contadorFila)) {
            document.getElementById("nombreCompleto").value = fila.cells[4].innerText;
            document.getElementById("iddescripcion").value = fila.cells[6].innerText;
            document.getElementById("idcontrasena").value = fila.cells[7].innerText;
            document.getElementById("idTipoUsuarioActu").value = fila.cells[9].innerText;
            document.getElementById("idRolUsuarioActu").value = fila.cells[10].innerText;
            document.getElementById("idRolEstadoActu").value = 0;
            id = fila.cells[2].innerText;

            if ("N" == fila.cells[11].innerText.trim().toUpperCase()) {
                document.getElementById("idRevisorActu").value = "1";
            }
            else {
                document.getElementById("idRevisorActu").value = "0";
            }

            if ('A' == fila.cells[8].innerText.trim().toUpperCase()) {
                document.getElementById("idRolEstadoActu").value = "0";
            }
            else {
                document.getElementById("idRolEstadoActu").value = "1";
            }



        }

    }

}
function elimnar_TablaUsuario(id) {
    if (document.getElementById(id).rows.length >= 1) {
        for (var i = document.getElementById(id).rows.length - 1; i > 0; i--) {
            document.getElementById(id).deleteRow(i);
            if (parseInt(document.getElementById(id).rows.length) === 1) {
                return true;
            }
        }
    }
}

function llenarComboTipoUsuarioActu(datos) {
    const combo = document.getElementById("idTipoUsuarioActu");
    for (let recorrer = 0; recorrer < datos.length; recorrer++) {
        const option = document.createElement("option");
        option.value = datos[recorrer].Id_TipoUsuario;
        option.text = datos[recorrer].Tipo;
        combo.add(option);
    }
}
function llenarComboRolUsuarioActu(datos) {
    const combo = document.getElementById("idRolUsuarioActu");
    for (let recorrer = 0; recorrer < datos.length; recorrer++) {
        const option = document.createElement("option");
        option.value = datos[recorrer].IdRolUsuario;
        option.text = datos[recorrer].Rol;
        combo.add(option);
    }

}
function getCookieUsuariosActu(name) {
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
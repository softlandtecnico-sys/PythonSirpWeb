$(document).ready(function () {
    MostrarTipoUsuario();
    ListarRolParaUsuarios();
    $("#idAgregarUsuario").click(function () {
        AgregarUsuario()
    });

});

function limpiar()
{
    $("#nombreUsuario").val("");
    $("#nombreCompleto").val("");
    $("#iddescripcion").val("");
    $("#idcontrasena").val("");
    $("#idTipoUsuario")[0].selectedIndex = 0;
    $("#idRolUsuario")[0].selectedIndex = 0;

}
async function BuscarUsuario() {
  try {
    let obtnerdato=0;
    const response = await fetch("/administracion/BuscarUsuario/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": getCookieUsuarios('csrftoken')
      },
      body: JSON.stringify({
        param0: "1",
        param1: $("#nombreUsuario").val().trim(),
        param2: ""
      })
    });

    const datos = await response.json();

    // Puedes manejar aquí la respuesta
    if (datos.length > 0) {
      if (Number(datos[0].Id_Usuario) !== 0) {
       obtnerdato=1;
      } 
    }

    // 👇 Aquí retornas la respuesta para poder usarla fuera
    return obtnerdato;

  } catch (err) {
    Swal.close();
    console.error("Ocurrió un error:", err);
    Swal.fire({
      icon: 'error',
      title: 'Error al consultar Tipo Usuario',
      text: err.message
    });
    return null; // retornas null si hubo error
  }
}

async function AgregarUsuario() {
    const resultado = await BuscarUsuario();
    const idTipoUsuario = document.getElementById("idTipoUsuario");
    const ObteneridTipoUsuario = idTipoUsuario.value;
    const idRolUsuario = document.getElementById("idRolUsuario");
    const ObteneridRolUsuario = idRolUsuario.value;
    var firma = "N";
    if ($("#idRevisor").is(":checked")) {
        firma = "S";
    }
    if ($("#idsinRevisor").is(":checked")) {
        firma = "N";

    }


    if ($("#nombreUsuario").val().trim() != "" && $("#nombreCompleto").val().trim() != "" && $("#idcontrasena").val().trim() != "") {
      
        if (resultado === 0) {
            try {
                // Mostrar el modal de carga
                Swal.fire({
                    title: 'Cargando datos...',
                    text: 'Por favor espere mientras se obtiene la confirmación.',
                    allowOutsideClick: false,
                    didOpen: () => {
                        Swal.showLoading();
                    }
                });

                // Esperar respuesta del servidor
                const response = await fetch("/administracion/GuardaUsuario/", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "X-CSRFToken": getCookieUsuarios('csrftoken')
                    },
                   body: JSON.stringify({
                        param0: "1",
                        param1: $("#nombreUsuario").val().trim(),
                        param2: $("#nombreCompleto").val().trim(),
                        param3: ObteneridTipoUsuario,
                        param4: $("#iddescripcion").val().trim(),
                        param5: $("#idcontrasena").val().trim(),
                        param6: "",
                        param7: "",
                        param8: ObteneridRolUsuario,
                        param9: firma
                    })
                });

                const datos = await response.json();
                Swal.close();
                if (datos.length > 0) {
                    if (Number(datos[0].exito) !== 0) {
                        limpiar();
                        Swal.fire({
                            position: 'top-end',
                            icon: 'info',
                            title: datos[0].mensaje,
                            showConfirmButton: false,
                            timer: 1500
                        });

                    } else {
                        Swal.fire({
                            position: 'top-end',
                            icon: 'info',
                            title: datos[0].mensaje,
                            showConfirmButton: false,
                            timer: 1500
                        });
                    }
                } else {
                    Swal.fire({
                        position: 'top-end',
                        icon: 'info',
                        title: 'Error de consulta',
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            } catch (err) {
                Swal.close();          
                Swal.fire({
                    icon: 'error',
                    title: 'Error al obtener los datos',
                    text: err.message
                });
            }
        } else {
            Swal.fire({
                position: 'top-end',
                icon: 'info',
                title: 'Usuario ya se encuentra registrado',
                showConfirmButton: false,
                timer: 1500
            });


        }
    } else {
        Swal.fire({
            position: 'top-end',
            icon: 'info',
            title: 'Debe de llenar todo los campos',
            showConfirmButton: false,
            timer: 1500
        });
    }
}
async function MostrarTipoUsuario() {
    try {

        fetch("/administracion/MostrarTipoUsuario/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-CSRFToken": getCookieUsuarios('csrftoken')
            },
        })
            .then(res => res.json())
            .then(data => {
                var datos = data;
                if (datos.length > 0) {
                    if (Number(datos[0].exito) != 0) {
                        llenarComboTipoUsuario(datos);
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
async function ListarRolParaUsuarios() {
    try {

        fetch("/administracion/ListarRolParaUsuarios/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-CSRFToken": getCookieUsuarios('csrftoken')
            },
        })
            .then(res => res.json())
            .then(data => {
                var datos = data;
                if (datos.length > 0) {
                    if (Number(datos[0].exito) != 0) {
                        llenarComboRolUsuario(datos);
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
function getCookieUsuarios(name) {
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
function llenarComboTipoUsuario(datos) {
    const combo = document.getElementById("idTipoUsuario");
    for (let recorrer = 0; recorrer < datos.length; recorrer++) {
        const option = document.createElement("option");
        option.value = datos[recorrer].Id_TipoUsuario;
        option.text = datos[recorrer].Tipo;
        combo.add(option);
    }
}
function llenarComboRolUsuario(datos) {
    const combo = document.getElementById("idRolUsuario");
    for (let recorrer = 0; recorrer < datos.length; recorrer++) {
        const option = document.createElement("option");
        option.value = datos[recorrer].IdRolUsuario;
        option.text = datos[recorrer].Rol;
        combo.add(option);
    }

}
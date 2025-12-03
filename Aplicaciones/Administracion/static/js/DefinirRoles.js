$(document).ready(function () {
DefinirRolParaUsuarios();
});



async function listarPermisos() {
    const idRolUsuario = document.getElementById("idRol");
    const ObteneridTRol = idRolUsuario.value;
     try {

        fetch("/administracion/ListarPermisos/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-CSRFToken": getCookieUsuariosDefinir('csrftoken')
            },            
                   body: JSON.stringify({
                        param0: ObteneridTRol,                       
                    })
                })
            .then(res => res.json())
            .then(data => {
                var datos = data;
                if (datos.length > 0) {
                    if (Number(datos[0].exito) != 0) {
                        llenarTablaMenu(datos);
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
async function DefinirRolParaUsuarios() {
    try {

        fetch("/administracion/ListarRolParaUsuarios/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-CSRFToken": getCookieUsuariosDefinir('csrftoken')
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
function llenarComboRolUsuario(datos) {
    const combo = document.getElementById("idRol");
    for (let recorrer = 0; recorrer < datos.length; recorrer++) {
        const option = document.createElement("option");
        option.value = datos[recorrer].IdRolUsuario;
        option.text = datos[recorrer].Rol;
        combo.add(option);
    }

}
function getCookieUsuariosDefinir(name) {
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
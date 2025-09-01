$(document).ready(function () {
    $("#iniciar_sesion").click(function () {
        buscarUsuario2();
    });
});
var datos;

async function buscarUsuario2() {
    if (document.getElementById("idcedula").value.trim() && document.getElementById("idclave").value.trim()) {
        fetch("/buscar_usuario/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-CSRFToken": getCookie('csrftoken') // Obligatorio para POST en Django
            },
            body: JSON.stringify({
                param0: "2",
                param1: document.getElementById("idcedula").value.trim(),
                param2: document.getElementById("idclave").value.trim()
            })
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                console.log(JSON.stringify(data, null, 2));
                datos = data;
                if (datos[0].Id_Usuario > 0) {
                    sessionStorage.setItem("usuario", JSON.stringify({
                        Id_Usuario: datos[0].Id_Usuario,
                        Usuario: datos[0].Usuario,
                        Nombre: datos[0].Nombre,
                        Id_TipoUsuario: datos[0].Id_TipoUsuario,
                        Descripcion: datos[0].Descripcion,
                        Contraseña: datos[0].Contraseña,
                        Estado: datos[0].Estado,
                        IdRolUsuario: datos[0].IdRolUsuario,
                        Firmar: datos[0].Firmar,

                    }));
                    window.location.href = "./mdi";
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
function getCookie(name) {
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


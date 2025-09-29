$(document).ready(function () {
    listarLibros();
    consultarDate();
    $("#idConsultarRegistro").click(function () {
        ConsultaRegistros();
    });
    $("#idActualizarRegistro").click(function () {
        actualizarFolio();
    });
});
var PId_Inscripcion;
function limpiarCampos()
{
PId_Inscripcion = "";
document.getElementById("idNumeroregistro").value = "";
document.getElementById("idRegistotomo").value = "";
document.getElementById("idFolioinicial").value = "";
document.getElementById("idFolioFinal").value = "";


}
function consultarDate() {
    let hoy = new Date().toISOString().split('T')[0];
    $("#idFechaLibroI").val(hoy);
    $("#idfechaLibroFin").val(hoy);

}
function actualizarFolio()
{

var PidInscripcio=PId_Inscripcion;
var PTomo = document.getElementById("idRegistotomo").value;
var PFolioI = document.getElementById("idFolioinicial").value;
var PFolioF = document.getElementById("idFolioFinal").value;

if(PTomo.trim()!="" & PFolioI.trim()!="" & PFolioF.trim()!=""){
    fetch("/inscripcion/ActualizarFolio/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-CSRFToken": getCookieLibros('csrftoken')
            },
            body: JSON.stringify({
                param0: PidInscripcio,
                param1: PTomo,
                param2: PFolioI,
                param3: PFolioF
            })
        })
            .then(res => res.json())
            .then(data => {
                var datos = data;
                if (datos.length > 0) {
                    if (Number(datos[0].exito) === 1) {
                         Swal.fire({
                            position: 'top-end',
                            icon: 'success',
                            title:"Datos Atualizados",
                            showConfirmButton: false,
                            timer: 1500
                        });

                      ConsultaRegistros();
                      limpiarCampos();                   
                    }
                    else if (Number(datos[0].exito) === 0) {
                        Swal.fire({
                            position: 'top-end',
                            icon: 'info',
                            title:datos[0].Error ,
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
        else{
             Swal.fire({
                            position: 'top-end',
                            icon: 'info',
                            title:"Debe de llenar los campos" ,
                            showConfirmButton: false,
                            timer: 1500
                        });

        }

}
function ConsultaRegistros() {
    const idLibro = document.getElementById("idLibros");
    const ObtenerIdLibro = idLibro.value;
    var pametroFechaIni = $("#idFechaLibroI").val();
    var pametroFechaFin = $("#idfechaLibroFin").val();
    if (pametroFechaIni <= pametroFechaFin) {

        fetch("/inscripcion/ListarFolio/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-CSRFToken": getCookieLibros('csrftoken')
            },
            body: JSON.stringify({
                param0: pametroFechaIni,
                param1: pametroFechaFin,
                param2: ObtenerIdLibro

            })
        })
            .then(res => res.json())
            .then(data => {
                var datos = data;
                let texto = "";
                if (datos.length > 0) {
                    if (Number(datos[0].Id_Inscripcion) != 0) {

                        llenar_tabla_ListarFolio(datos)
                    }
                    else if (Number(datos[0].Id_Inscripcion) === 0) {
                        Swal.fire({
                            position: 'top-end',
                            icon: 'info',
                            title: 'Registro no Actualizado',
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



}
function llenarComboLibro(datos) {
    const combo = document.getElementById("idLibros");
    for (let recorrer = 0; recorrer < datos.length; recorrer++) {
        const option = document.createElement("option");
        option.value = datos[recorrer].Cod_Libro;
        option.text = datos[recorrer].Libro;
        combo.add(option);
    }

}
function elimnar_todo_filasListarFolio(id) {
    if (document.getElementById(id).rows.length >= 1) {
        for (var i = document.getElementById(id).rows.length - 1; i > 0; i--) {
            document.getElementById(id).deleteRow(i);
            if (parseInt(document.getElementById(id).rows.length) === 1) {
                return true;
            }
        }
    }
}
function llenar_tabla_ListarFolio(datos) {
    elimnar_todo_filasListarFolio("idTableRegistroMostrar")
    let contadorFila = 0;
    for (let recorrer = 0; recorrer < datos.length; recorrer++) {
        contadorFila++;
        $("<tr><td><button class='btn btn-primary me-2 mb-2' onclick='ObterInformacion(\"" + datos[recorrer].Id_Inscripcion + "\",\"" + datos[recorrer].Tomo + "\",\"" + datos[recorrer].Folio_Inicial + "\",\"" + datos[recorrer].Folio_Final +   "\",\"" + datos[recorrer].No_Registro    + "\")'>Seleccionar</button></td><td class='td-texto' style='display: none;'>" + contadorFila + "</td><td class='td-texto'> " + datos[recorrer].Id_Inscripcion + " </td><td class='td-texto'> " + datos[recorrer].Fecha_Inscripcion + " </td><td class='td-texto'> " + datos[recorrer].Libro + " </td><td class='td-texto'>" + datos[recorrer].No_Registro + "</td><td class='td-texto'>" + datos[recorrer].Tomo + "</td><td class='td-texto'>" + datos[recorrer].Folio_Inicial + "</td><td class='td-texto'>" + datos[recorrer].Folio_Final + "</td></tr>").appendTo('#idTableRegistroMostrar');
    }

}
function ObterInformacion(parameteridinscr, parametrTomo, parameterFolinioInicial,parameterFolinioFinal, parameterNumeroRe){
PId_Inscripcion = parameteridinscr;
document.getElementById("idNumeroregistro").value = parameterNumeroRe;
document.getElementById("idRegistotomo").value = parametrTomo;
document.getElementById("idFolioinicial").value = parameterFolinioInicial;
document.getElementById("idFolioFinal").value = parameterFolinioFinal;


}
function listarLibros() {
    const combo = document.getElementById("idLibros");

    fetch("/inscripcion/ListarLibrosVigentes/", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "X-CSRFToken": getCookieLibros('csrftoken')
        },
    })
        .then(res => res.json())
        .then(data => {
            var datos = data;
            if (datos.length > 0) {
                if (Number(datos[0].Cod_Libro) != 0) {
                    llenarComboLibro(datos);
                }
                else if (Number(datos[0].Cod_Libro) === 0) {

                }
            }

        })
        .catch(err => {
            console.log("Ocurrió un error:", err);

        });
}
function getCookieLibros(name) {
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
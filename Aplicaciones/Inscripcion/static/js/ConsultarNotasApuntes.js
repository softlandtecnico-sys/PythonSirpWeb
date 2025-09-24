$(document).ready(function () {
    llenarComplementos();
    $("#idBuscarNotasApuntes").click(function () {
        BuscarPorApuntes();
    });
});
function llenarComplementos() {

    const combo = document.getElementById("idNotayear");
    const añoActual = new Date().getFullYear();
    for (let i = añoActual; i >= 2010; i--) {
        const option = document.createElement("option");
        option.value = i;
        option.text = i;
        combo.add(option);
    }
    const datos = [{ value: "1", text: "PROPIEDAD" }, { value: "2", text: "MERCANTIL" }];
    const combotipoRegistro = document.getElementById("idnotaTipoRegi");
    for (let i = 0; i < datos.length; i++) {
        const option = document.createElement("option");
        option.value = datos[i].value;
        option.text = datos[i].text;
        combotipoRegistro.add(option);
    }
    const datostramite = [{ value: "0", text: "AÑO DEL(APUNTE/NOTA)" }, { value: "1", text: "N° DE TRÁMITE" }];
    const combotipotramite = document.getElementById("idnotatramite");
    for (let i = 0; i < datostramite.length; i++) {
        const option = document.createElement("option");
        option.value = datostramite[i].value;
        option.text = datostramite[i].text;
        combotipotramite.add(option);
    }
}
function elimnar_todo_filasNotasApuntes(id) {
    if (document.getElementById(id).rows.length >= 1) {
        for (var i = document.getElementById(id).rows.length - 1; i > 0; i--) {
            document.getElementById(id).deleteRow(i);
            if (parseInt(document.getElementById(id).rows.length) === 1) {
                return true;
            }
        }
    }
}
function llenarTextAreaNota(Parametr)
{
   

    document.getElementById("idTextApunteObser").innerHTML = Parametr;

}
function llenar_tabla_NotasApuntes(datos,mOpcionConsulta) {
    elimnar_todo_filasNotasApuntes("idTableNotasApuntes")
    let contadorFila = 0;
    if (Number(mOpcionConsulta) === 1) {
        for (let recorrer = 0; recorrer < datos.length; recorrer++) {
            contadorFila++;
            $("<tr><td><button class='btn btn-primary me-2 mb-2' disabled>Selecionar</button></td><td class='td-texto' style='display: none;'>" + contadorFila + "</td><td class='td-texto'> " + datos[recorrer].IdComprobante + " </td><td class='td-texto'> " + datos[recorrer].FechaApunte + " </td><td class='td-texto'> " + datos[recorrer].EmitidoPor + " </td><td class='td-texto'>" + datos[recorrer].Apunte + "</td></tr>").appendTo('#idTableNotasApuntes');
            document.getElementById("idTextApunteObser").innerHTML += datos[recorrer].Apunte + "\n";
        }
    }
    else{
          for (let recorrer = 0; recorrer < datos.length; recorrer++) {
            contadorFila++;
            $("<tr><td><button class='btn btn-primary me-2 mb-2' onclick='llenarTextAreaNota(\"" + datos[recorrer].Apunte + "\")'>Selecionar</button></td><td class='td-texto' style='display: none;'>" + contadorFila + "</td><td class='td-texto'> " + datos[recorrer].IdComprobante + " </td><td class='td-texto'> " + datos[recorrer].FechaApunte + " </td><td class='td-texto'> " + datos[recorrer].EmitidoPor + " </td><td class='td-texto'>" + datos[recorrer].Apunte + "</td></tr>").appendTo('#idTableNotasApuntes');
        }
    }



}
function BuscarPorApuntes() {

    const comcbBuscarPor = document.getElementById("idnotatramite");
    const comcbBuscarPorvalor = comcbBuscarPor.value;
    const comcbBuscarTipoREgistro = document.getElementById("idnotaTipoRegi");
    const comboanio = document.getElementById("idNotayear");
    var mParam = "";
    var mAnio = "";
    let mOpcionConsulta = "";
    switch (Number(comcbBuscarPorvalor)) {
        case 0:
            mParam = document.getElementById("idtextBuscar").value.trim();
            mAnio = "";
            break;
        case 1:
            var ordenFormateado = document.getElementById("idtextBuscar").value.trim();
            mParam = comcbBuscarTipoREgistro.value + "1" + comboanio.value + ordenFormateado.padStart(6, "0");
            mAnio = comboanio.value
            break;
    }
    if ($("#idtipoBusquedaApuntes").is(":checked")) {
        mOpcionConsulta = Number(comcbBuscarPor.value) + 1

        fetch("/inscripcion/BuscarApuntes/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-CSRFToken": getCookieLNotasPuntes('csrftoken')
            },
            body: JSON.stringify({
                param0: mOpcionConsulta,
                param1: mParam

            })
        })
            .then(res => res.json())
            .then(data => {
                var datos = data;
                let texto = "";
                if (datos.length > 0) {
                    if (Number(datos[0].IdComprobante) != 0) {

                        llenar_tabla_NotasApuntes(datos, comcbBuscarPor.value)
                    }
                    else if (Number(datos[0].IdComprobante) === 0) {
                        Swal.fire({
                            position: 'top-end',
                            icon: 'info',
                            title: 'Apunte no registrado',
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

        ListarNotaP(mOpcionConsulta, mParam)

    }


}
function getCookieLNotasPuntes(name) {
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
$(document).ready(function() {
/*const usuario = JSON.parse(sessionStorage.getItem("usuario"));
if (!usuario) {
    window.location.href = "./login.php";
} else {
*/

    $(document).on('click', '#1', function() {
        crearIframe('/inscripcion/FOrdenesInscripcion/','100%');
    });
$(document).on('click', '#2', function() {
        crearIframe('/inscripcion/FOrdenesPrelacion','100%');
    });
    $(document).on('click', '#3', function() {
        crearIframe('/inscripcion/FNotasDevoNegativa','100%');
    });
     $(document).on('click', '#4', function() {
        crearIframe('/inscripcion/FConsultarNotasApuntes/','100%');
    });
    $(document).on('click', '#5', function() {
        crearIframe('/inscripcion/FBuscarInscripcion','100%');
    });
     $(document).on('click', '#6', function() {
        crearIframe('/inscripcion/FListadoInscripcionesporingresar','100%');
    });
     $(document).on('click', '#7', function() {
        crearIframe('/inscripcion/FNuevaFichaRegistral','100%');
    });
    $(document).on('click', '#8', function() {
        crearIframe('/inscripcion/FListarFolio','100%');
    });
    $(document).on('click', '#9', function() {
        crearIframe('/inscripcion/FControlCalidadInscripcion','100%');
    });
    $(document).on('click', '#112', function() {
        llamar_modal('/mantenimientousuario.php','90');
    });
    $(document).on('click', '#113', function() {
        llamar_modal('/rolesusuario.php','90');
    });
    $(document).on('click', '#114', function() {
        llamar_modal('/registrodepropiedad.php','90');
    });
    $(document).on('click', '#119', function() {
        llamar_modal('/tablavalores.php','90');
    });
    $(document).on('click', '#120', function() {
        llamar_modal('/librosregistrales.php','90');
    });
    $(document).on('click', '#121', function() {
        llamar_modal('/parametros.php','70');
    });
    

    
    $(document).on('click', '#125', function() {
        llamar_modal('../Page/ayuda/ayudaRegistral.php','90');
    });
    $(document).on('click', '#128', function(){
        llamar_modal('../Page/ayuda/acercasirp.php','70');       
    });
    $(document).on('click', '#126', function(){
        llamar_modal('../Page/ayuda/manual_usuario.php','90');       
    });

    $(document).on('click', '#127', function(){
        llamar_modal('../Page/ayuda/manual_procedimiento.php','90');       
    });




   // }
});
function cerrarSesion() {
    sessionStorage.removeItem("usuario");
    window.location.href = "./login.html";
}
function llamar_modal(page)
{

  fetch(page)
  .then(response => response.text())
  .then(data => {
    const iframe = document.getElementById("contenedor_iframer");
    const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;

    // Escribir el contenido dentro del iframe
    iframeDoc.open();
    iframeDoc.write(data);
    iframeDoc.close();
  });


}
function crearIframe(page, ancho, largo = "400px") {
  // Crear el iframe
  const iframe = document.createElement("iframe");
  iframe.style.width = ancho;
  iframe.style.height = largo;
  iframe.style.margin = "2px";
  iframe.style.border = "0";

  //iframe.style.transform = "scale(0.9)";
  //iframe.setAttribute("scrolling", "no");


  // Contenedor
  const contenedor = document.createElement("div");
  contenedor.style.width ="100%";
  contenedor.style.position = "relative";
  contenedor.style.padding = "0";
  contenedor.style.border = "1px solid #ccc";
  contenedor.style.boxShadow = "rgba(0,0,0,0.24) 0px 3px 8px";
  contenedor.style.background = "white";
  contenedor.style.boxSizing = "border-box";
  contenedor.style.overflow = "hidden"; 
    // Crear botón de cerrar
  const botonCerrar = document.createElement("button");
  botonCerrar.innerText = "X";
  botonCerrar.className = "btn btn-danger";
  botonCerrar.style.position = "absolute";
  botonCerrar.style.top = "5px";
  botonCerrar.style.marginBottom="5%";
  botonCerrar.style.right = "5px";
  botonCerrar.onclick = function () {
    contenedor.remove();
  };

  contenedor.appendChild(iframe);
  contenedor.appendChild(botonCerrar);
  document.getElementById("contenedor_iframer").appendChild(contenedor);

  fetch(page)
    .then(response => response.text())
    .then(data => {
      const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
      iframeDoc.open();
      iframeDoc.write(`
        <style>
          html, body {
            margin: 0;
            padding: 0;
            overflow-x: hidden;
            font-size:  12px;
          }
        </style>
        ${data}
      `);
      iframeDoc.close();
      setTimeout(() => {
        const altura = iframeDoc.body.scrollHeight;
        iframe.style.height = altura + "px";
      }, 100);
    })
    .catch(err => console.error("Error cargando página en iframe:", err));
}

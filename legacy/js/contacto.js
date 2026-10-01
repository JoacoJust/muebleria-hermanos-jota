function esEmailValido(email) {
  return email.includes("@") && email.includes(".");
}

function mostrarMensajeExito(contenedor) {
  contenedor.innerHTML = "";
  const mensaje = document.createElement("p");
  mensaje.className = "mensaje-exito";
  mensaje.textContent = "¡Gracias por contactarnos! Te responderemos a la brevedad.";
  contenedor.appendChild(mensaje);
}

function validarFormulario(evento) {
  evento.preventDefault();

  const nombre = document.getElementById("nombre");
  const email = document.getElementById("email");
  const mensaje = document.getElementById("mensaje");
  const contenedorExito = document.getElementById("mensaje-exito");

  contenedorExito.innerHTML = "";

  if (nombre.value.trim() === "") {
    contenedorExito.innerHTML = "<p class=\"mensaje-error\">El nombre es obligatorio.</p>";
    return;
  }

  if (email.value.trim() === "" || !esEmailValido(email.value.trim())) {
    contenedorExito.innerHTML = "<p class=\"mensaje-error\">Ingresá un email válido.</p>";
    return;
  }

  if (mensaje.value.trim() === "") {
    contenedorExito.innerHTML = "<p class=\"mensaje-error\">El mensaje es obligatorio.</p>";
    return;
  }

  mostrarMensajeExito(contenedorExito);

  const formulario = document.getElementById("formulario-contacto");
  formulario.reset();
}

document.addEventListener("DOMContentLoaded", function () {
  const formulario = document.getElementById("formulario-contacto");
  if (formulario) {
    formulario.addEventListener("submit", validarFormulario);
  }
});

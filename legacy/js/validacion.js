const formContacto = document.querySelector("#form-contacto");
const exitoContacto = document.querySelector("#exito-contacto");

if (formContacto) {
  formContacto.addEventListener("submit", (event) => {
    event.preventDefault();

    const nombre = document.querySelector("#nombre").value.trim();
    const email = document.querySelector("#email").value.trim();
    const telefono = document.querySelector("#telefono").value.trim();
    const asunto = document.querySelector("#asunto").value.trim();
    const mensaje = document.querySelector("#mensaje").value.trim();

    let valido = true;

    document.querySelectorAll(".error").forEach((elemento) => {
      elemento.textContent = "";
      elemento.classList.remove("visible");
    });

    if (nombre.length < 3) {
      mostrarError("error-nombre", "El nombre debe tener al menos 3 caracteres");
      valido = false;
    }

    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regexEmail.test(email)) {
      mostrarError("error-email", "Ingresa un email válido");
      valido = false;
    }

    if (telefono && !/^\d{10,}$/.test(telefono.replace(/\D/g, ""))) {
      mostrarError("error-telefono", "Teléfono debe tener al menos 10 dígitos");
      valido = false;
    }

    if (asunto.length < 5) {
      mostrarError("error-asunto", "El asunto debe tener al menos 5 caracteres");
      valido = false;
    }

    if (mensaje.length < 10) {
      mostrarError("error-mensaje", "El mensaje debe tener al menos 10 caracteres");
      valido = false;
    }

    if (valido) {
      const contacto = {
        nombre,
        email,
        telefono,
        asunto,
        mensaje,
        fecha: new Date().toISOString()
      };

      const contactos = JSON.parse(localStorage.getItem("contactos") || "[]");
      contactos.push(contacto);
      localStorage.setItem("contactos", JSON.stringify(contactos));

      formContacto.style.display = "none";
      exitoContacto.style.display = "block";
    }
  });

  const btnEnviarOtro = document.querySelector("#btn-enviar-otro");
  if (btnEnviarOtro) {
    btnEnviarOtro.addEventListener("click", () => {
      formContacto.reset();
      formContacto.style.display = "block";
      exitoContacto.style.display = "none";
    });
  }
}

function mostrarError(idError, mensaje) {
  const errorEl = document.querySelector("#" + idError);
  if (errorEl) {
    errorEl.textContent = mensaje;
    errorEl.classList.add("visible");
  }
}

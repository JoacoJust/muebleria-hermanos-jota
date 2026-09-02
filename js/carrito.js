if (document.querySelector("#main-carrito")) {
  function cargarCarrito() {
    const carrito = obtenerCarrito();
    const carritoVacio = document.querySelector("#carrito-vacio");
    const carritoLleno = document.querySelector("#carrito-lleno");
    const tbodyCarrito = document.querySelector("#tbody-carrito");

    if (carrito.length === 0) {
      carritoVacio.style.display = "block";
      carritoLleno.style.display = "none";
      return;
    }

    carritoVacio.style.display = "none";
    carritoLleno.style.display = "grid";
    tbodyCarrito.innerHTML = "";

    let subtotal = 0;

    carrito.forEach((item) => {
      const subtotalItem = item.precio * item.cantidad;
      subtotal += subtotalItem;

      const fila = document.createElement("tr");
      fila.innerHTML =
        "<td>" + item.nombre + "</td>" +
        "<td>" + formatearMoneda(item.precio) + "</td>" +
        "<td>" +
          "<button type=\"button\" class=\"btn-cantidad\" data-id=\"" + item.id + "\" data-accion=\"restar\">-</button> " +
          item.cantidad + " " +
          "<button type=\"button\" class=\"btn-cantidad\" data-id=\"" + item.id + "\" data-accion=\"sumar\">+</button>" +
        "</td>" +
        "<td>" + formatearMoneda(subtotalItem) + "</td>" +
        "<td><button type=\"button\" class=\"btn-eliminar\" data-id=\"" + item.id + "\">Eliminar</button></td>";

      tbodyCarrito.appendChild(fila);
    });

    const envio = subtotal > 50000 ? 0 : 5000;
    const total = subtotal + envio;

    document.querySelector("#subtotal").textContent = formatearMoneda(subtotal);
    document.querySelector("#envio").textContent = envio === 0 ? "Gratis" : formatearMoneda(envio);
    document.querySelector("#total").textContent = formatearMoneda(total);

    document.querySelectorAll(".btn-cantidad").forEach((btn) => {
      btn.addEventListener("click", (event) => {
        const id = parseInt(event.target.dataset.id, 10);
        const accion = event.target.dataset.accion;
        modificarCantidad(id, accion);
      });
    });

    document.querySelectorAll(".btn-eliminar").forEach((btn) => {
      btn.addEventListener("click", (event) => {
        const id = parseInt(event.target.dataset.id, 10);
        eliminarDelCarrito(id);
      });
    });
  }

  function modificarCantidad(idProducto, accion) {
    let carrito = obtenerCarrito();
    const item = carrito.find((p) => p.id === idProducto);

    if (item) {
      if (accion === "sumar") {
        item.cantidad += 1;
      } else if (accion === "restar") {
        item.cantidad -= 1;
        if (item.cantidad < 1) {
          carrito = carrito.filter((p) => p.id !== idProducto);
        }
      }
    }

    guardarCarrito(carrito);
    cargarCarrito();
  }

  function eliminarDelCarrito(idProducto) {
    let carrito = obtenerCarrito();
    carrito = carrito.filter((p) => p.id !== idProducto);
    guardarCarrito(carrito);
    cargarCarrito();
  }

  const btnProcesar = document.querySelector("#btn-procesar");
  if (btnProcesar) {
    btnProcesar.addEventListener("click", () => {
      alert("¡Compra procesada con éxito! Gracias por elegir Hermanos Jota.");
      guardarCarrito([]);
      cargarCarrito();
    });
  }

  document.addEventListener("DOMContentLoaded", () => {
    cargarCarrito();
    actualizarContadorCarrito();
  });
}

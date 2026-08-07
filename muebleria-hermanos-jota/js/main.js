const CLAVE_CARRITO = "hermanos-jota-carrito";

function obtenerCarrito() {
  const datosGuardados = localStorage.getItem(CLAVE_CARRITO);
  if (datosGuardados) {
    return JSON.parse(datosGuardados);
  }
  return [];
}

function guardarCarrito(carrito) {
  localStorage.setItem(CLAVE_CARRITO, JSON.stringify(carrito));
}

function contarItemsCarrito(carrito) {
  let total = 0;
  for (let i = 0; i < carrito.length; i++) {
    total += carrito[i].cantidad;
  }
  return total;
}

function actualizarContadorCarrito() {
  const contador = document.getElementById("contador-carrito");
  if (!contador) {
    return;
  }
  const carrito = obtenerCarrito();
  contador.textContent = contarItemsCarrito(carrito);
}

function agregarAlCarrito(idProducto) {
  const carrito = obtenerCarrito();
  let productoEncontrado = null;

  for (let i = 0; i < carrito.length; i++) {
    if (carrito[i].id === idProducto) {
      productoEncontrado = carrito[i];
      break;
    }
  }

  if (productoEncontrado) {
    productoEncontrado.cantidad += 1;
  } else {
    carrito.push({ id: idProducto, cantidad: 1 });
  }

  guardarCarrito(carrito);
  actualizarContadorCarrito();
  renderizarPanelCarrito();
}

function calcularTotalCarrito(carrito) {
  let total = 0;
  for (let i = 0; i < carrito.length; i++) {
    const producto = obtenerProductoPorId(carrito[i].id);
    if (producto) {
      total += producto.precio * carrito[i].cantidad;
    }
  }
  return total;
}

function renderizarPanelCarrito() {
  const lista = document.getElementById("lista-carrito");
  const totalElemento = document.getElementById("total-carrito");
  if (!lista || !totalElemento) {
    return;
  }

  const carrito = obtenerCarrito();
  lista.innerHTML = "";

  if (carrito.length === 0) {
    const mensaje = document.createElement("li");
    mensaje.className = "panel-carrito__vacio";
    mensaje.textContent = "Tu carrito está vacío.";
    lista.appendChild(mensaje);
    totalElemento.textContent = "";
    return;
  }

  for (let i = 0; i < carrito.length; i++) {
    const item = carrito[i];
    const producto = obtenerProductoPorId(item.id);
    if (!producto) {
      continue;
    }

    const fila = document.createElement("li");
    fila.className = "panel-carrito__item";

    const nombre = document.createElement("span");
    nombre.className = "panel-carrito__nombre";
    nombre.textContent = producto.nombre;

    const cantidad = document.createElement("span");
    cantidad.className = "panel-carrito__cantidad";
    cantidad.textContent = "x" + item.cantidad;

    const subtotal = document.createElement("span");
    subtotal.className = "panel-carrito__subtotal";
    subtotal.textContent = formatearPrecio(producto.precio * item.cantidad);

    fila.appendChild(nombre);
    fila.appendChild(cantidad);
    fila.appendChild(subtotal);
    lista.appendChild(fila);
  }

  totalElemento.textContent = "Total: " + formatearPrecio(calcularTotalCarrito(carrito));
}

function abrirPanelCarrito() {
  const panel = document.getElementById("panel-carrito");
  const boton = document.getElementById("btn-carrito");
  if (!panel || !boton) {
    return;
  }
  renderizarPanelCarrito();
  panel.classList.add("panel-carrito--visible");
  boton.setAttribute("aria-expanded", "true");
}

function cerrarPanelCarrito() {
  const panel = document.getElementById("panel-carrito");
  const boton = document.getElementById("btn-carrito");
  if (!panel || !boton) {
    return;
  }
  panel.classList.remove("panel-carrito--visible");
  boton.setAttribute("aria-expanded", "false");
}

function alternarPanelCarrito() {
  const panel = document.getElementById("panel-carrito");
  if (!panel) {
    return;
  }
  if (panel.classList.contains("panel-carrito--visible")) {
    cerrarPanelCarrito();
  } else {
    abrirPanelCarrito();
  }
}

function inicializarPanelCarrito() {
  const boton = document.getElementById("btn-carrito");
  if (!boton || document.getElementById("panel-carrito")) {
    return;
  }

  const panel = document.createElement("aside");
  panel.id = "panel-carrito";
  panel.className = "panel-carrito";
  panel.setAttribute("aria-label", "Contenido del carrito");

  const titulo = document.createElement("h2");
  titulo.className = "panel-carrito__titulo";
  titulo.textContent = "Mi carrito";

  const lista = document.createElement("ul");
  lista.id = "lista-carrito";
  lista.className = "panel-carrito__lista";

  const total = document.createElement("p");
  total.id = "total-carrito";
  total.className = "panel-carrito__total";

  const botonCerrar = document.createElement("button");
  botonCerrar.type = "button";
  botonCerrar.id = "cerrar-carrito";
  botonCerrar.className = "btn btn-primario panel-carrito__cerrar";
  botonCerrar.textContent = "Cerrar";

  panel.appendChild(titulo);
  panel.appendChild(lista);
  panel.appendChild(total);
  panel.appendChild(botonCerrar);
  document.body.appendChild(panel);

  boton.addEventListener("click", function (evento) {
    evento.stopPropagation();
    alternarPanelCarrito();
  });

  botonCerrar.addEventListener("click", cerrarPanelCarrito);

  document.addEventListener("click", function (evento) {
    const panelCarrito = document.getElementById("panel-carrito");
    if (!panelCarrito || !panelCarrito.classList.contains("panel-carrito--visible")) {
      return;
    }
    if (!panelCarrito.contains(evento.target) && evento.target !== boton && !boton.contains(evento.target)) {
      cerrarPanelCarrito();
    }
  });
}

function mostrarSpinner(contenedor) {
  contenedor.innerHTML = "";
  const spinner = document.createElement("p");
  spinner.className = "mensaje-carga";
  spinner.textContent = "Cargando productos...";
  contenedor.appendChild(spinner);
}

function ocultarSpinner(contenedor) {
  contenedor.innerHTML = "";
}

function crearTarjetaProducto(producto) {
  const enlace = document.createElement("a");
  enlace.href = "producto.html?id=" + producto.id;
  enlace.className = "tarjeta-producto";

  const imagen = document.createElement("img");
  imagen.src = producto.imagen;
  imagen.alt = producto.nombre;
  imagen.className = "tarjeta-producto__imagen";

  const cuerpo = document.createElement("div");
  cuerpo.className = "tarjeta-producto__cuerpo";

  const categoria = document.createElement("span");
  categoria.className = "tarjeta-producto__categoria";
  categoria.textContent = producto.categoria;

  const titulo = document.createElement("h3");
  titulo.className = "tarjeta-producto__titulo";
  titulo.textContent = producto.nombre;

  const descripcion = document.createElement("p");
  descripcion.className = "tarjeta-producto__descripcion";
  descripcion.textContent = producto.descripcion;

  const precio = document.createElement("p");
  precio.className = "tarjeta-producto__precio";
  precio.textContent = formatearPrecio(producto.precio);

  cuerpo.appendChild(categoria);
  cuerpo.appendChild(titulo);
  cuerpo.appendChild(descripcion);
  cuerpo.appendChild(precio);

  enlace.appendChild(imagen);
  enlace.appendChild(cuerpo);

  return enlace;
}

document.addEventListener("DOMContentLoaded", function () {
  inicializarPanelCarrito();
  actualizarContadorCarrito();
  cargarProductosDestacados();
});

async function cargarProductosDestacados() {
  const contenedor = document.getElementById("productos-destacados");
  if (!contenedor) {
    return;
  }

  mostrarSpinner(contenedor);
  const data = await obtenerProductos();
  ocultarSpinner(contenedor);

  const destacados = data.filter(function (producto) {
    return producto.destacado === true;
  });

  contenedor.innerHTML = "";
  for (let i = 0; i < destacados.length; i++) {
    const tarjeta = crearTarjetaProducto(destacados[i]);
    contenedor.appendChild(tarjeta);
  }
}

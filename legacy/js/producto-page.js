async function cargarDetalleProducto() {
  const contenedor = document.getElementById("detalle-producto");
  if (!contenedor) {
    return;
  }

  const parametros = new URLSearchParams(window.location.search);
  const idParametro = parametros.get("id");
  const idProducto = parseInt(idParametro, 10);

  if (!idProducto) {
    contenedor.innerHTML = "<p class=\"mensaje-vacio\">Producto no encontrado.</p>";
    return;
  }

  mostrarSpinner(contenedor);
  await obtenerProductos();
  ocultarSpinner(contenedor);

  const producto = obtenerProductoPorId(idProducto);

  if (!producto) {
    contenedor.innerHTML = "<p class=\"mensaje-vacio\">Producto no encontrado.</p>";
    return;
  }

  renderizarDetalle(producto, contenedor);
}

function renderizarDetalle(producto, contenedor) {
  contenedor.innerHTML = "";

  const imagen = document.createElement("img");
  imagen.src = producto.imagen;
  imagen.alt = producto.nombre;
  imagen.className = "detalle-producto__imagen";

  const info = document.createElement("div");
  info.className = "detalle-producto__info";

  const categoria = document.createElement("span");
  categoria.className = "detalle-producto__categoria";
  categoria.textContent = producto.categoria;

  const titulo = document.createElement("h1");
  titulo.className = "detalle-producto__titulo";
  titulo.textContent = producto.nombre;

  const descripcion = document.createElement("p");
  descripcion.className = "detalle-producto__descripcion";
  descripcion.textContent = producto.descripcion;

  const fabricacion = document.createElement("p");
  fabricacion.className = "detalle-producto__fabricacion";
  fabricacion.textContent = producto.detalleFabricacion;

  const precio = document.createElement("p");
  precio.className = "detalle-producto__precio";
  precio.textContent = formatearPrecio(producto.precio);

  const boton = document.createElement("button");
  boton.type = "button";
  boton.id = "btn-agregar-carrito";
  boton.className = "btn btn-primario";
  boton.textContent = "Añadir al Carrito";

  boton.addEventListener("click", function () {
    agregarAlCarrito(producto.id);
  });

  info.appendChild(categoria);
  info.appendChild(titulo);
  info.appendChild(descripcion);
  info.appendChild(fabricacion);
  info.appendChild(precio);
  info.appendChild(boton);

  contenedor.appendChild(imagen);
  contenedor.appendChild(info);
}

document.addEventListener("DOMContentLoaded", cargarDetalleProducto);

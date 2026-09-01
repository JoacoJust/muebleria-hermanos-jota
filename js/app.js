function guardarCarrito(items) {
  localStorage.setItem("carrito", JSON.stringify(items));
  actualizarContadorCarrito();
}

function obtenerCarrito() {
  const carrito = localStorage.getItem("carrito");
  return carrito ? JSON.parse(carrito) : [];
}

function actualizarContadorCarrito() {
  const carrito = obtenerCarrito();
  const total = carrito.reduce((suma, item) => suma + item.cantidad, 0);
  document.querySelectorAll(".contador-carrito").forEach((contador) => {
    contador.textContent = total;
  });
}

function crearTarjetaProducto(producto) {
  const article = document.createElement("article");
  article.className = "tarjeta-producto";

  const precioOriginal = producto.descuento > 0
    ? "<span class=\"precio-original\">" + formatearMoneda(producto.precio) + "</span>"
    : "";

  const descuentoBadge = producto.descuento > 0
    ? "<span class=\"descuento-badge\">-" + producto.descuento + "%</span>"
    : "";

  article.innerHTML =
    "<img src=\"" + producto.imagen + "\" alt=\"" + producto.nombre + "\" class=\"tarjeta-imagen\">" +
    "<div class=\"tarjeta-contenido\">" +
      "<h3 class=\"tarjeta-nombre\">" + producto.nombre + "</h3>" +
      "<div class=\"tarjeta-precio\">" +
        precioOriginal +
        "<span class=\"precio-final\">" + formatearMoneda(producto.precioFinal) + "</span>" +
        descuentoBadge +
      "</div>" +
      "<div class=\"tarjeta-btn\">" +
        "<a href=\"producto.html?id=" + producto.id + "\" class=\"btn btn-primary\">Ver Detalles</a>" +
      "</div>" +
    "</div>";

  return article;
}

function agregarAlCarrito(producto, cantidad) {
  const carrito = obtenerCarrito();
  const existe = carrito.find((item) => item.id === producto.id);

  if (existe) {
    existe.cantidad += cantidad;
  } else {
    carrito.push({
      id: producto.id,
      nombre: producto.nombre,
      precio: producto.precioFinal,
      cantidad: cantidad,
      imagen: producto.imagen
    });
  }

  guardarCarrito(carrito);
}

if (document.querySelector("#grid-destacados")) {
  function cargarDestacados() {
    const gridDestacados = document.querySelector("#grid-destacados");
    gridDestacados.innerHTML = "";

    PRODUCTOS.slice(0, 4).forEach((producto) => {
      gridDestacados.appendChild(crearTarjetaProducto(producto));
    });
  }

  document.addEventListener("DOMContentLoaded", () => {
    cargarDestacados();
    actualizarContadorCarrito();
  });
}

if (document.querySelector("#grid-catalogo")) {
  let productosFiltrados = [...PRODUCTOS];

  function renderizarProductos(productos) {
    const gridCatalogo = document.querySelector("#grid-catalogo");
    const sinResultados = document.querySelector("#sin-resultados");
    const resultadosBusqueda = document.querySelector("#resultados-busqueda");
    gridCatalogo.innerHTML = "";

    if (resultadosBusqueda) {
      resultadosBusqueda.textContent = productos.length + " producto(s) encontrado(s)";
    }

    if (productos.length === 0) {
      sinResultados.style.display = "block";
      return;
    }

    sinResultados.style.display = "none";
    productos.forEach((producto) => {
      gridCatalogo.appendChild(crearTarjetaProducto(producto));
    });
  }

  const inputBusqueda = document.querySelector("#busqueda");
  const checkboxesCategorias = document.querySelectorAll(".filter-checkbox");
  const inputPrecio = document.querySelector("#filter-precio");
  const precioDisplay = document.querySelector("#precio-display");
  const btnLimpiar = document.querySelector("#btn-limpiar-filtros");

  function aplicarFiltros() {
    let resultado = [...PRODUCTOS];

    const categoriasSeleccionadas = Array.from(checkboxesCategorias)
      .filter((cb) => cb.checked)
      .map((cb) => cb.value);

    if (categoriasSeleccionadas.length > 0) {
      resultado = resultado.filter((p) => categoriasSeleccionadas.includes(p.categoria));
    }

    const precioMax = inputPrecio ? parseInt(inputPrecio.value, 10) : 100000;
    resultado = resultado.filter((p) => p.precioFinal <= precioMax);

    if (inputBusqueda) {
      const termino = inputBusqueda.value.toLowerCase();
      if (termino) {
        resultado = resultado.filter((p) =>
          p.nombre.toLowerCase().includes(termino) ||
          p.descripcion.toLowerCase().includes(termino)
        );
      }
    }

    productosFiltrados = resultado;
    renderizarProductos(resultado);
  }

  if (inputBusqueda) {
    inputBusqueda.addEventListener("input", aplicarFiltros);
  }

  checkboxesCategorias.forEach((checkbox) => {
    checkbox.addEventListener("change", aplicarFiltros);
  });

  if (inputPrecio) {
    inputPrecio.addEventListener("input", (event) => {
      if (precioDisplay) {
        precioDisplay.textContent = event.target.value;
      }
      aplicarFiltros();
    });
  }

  if (btnLimpiar) {
    btnLimpiar.addEventListener("click", () => {
      checkboxesCategorias.forEach((cb) => { cb.checked = false; });
      if (inputPrecio) inputPrecio.value = 100000;
      if (precioDisplay) precioDisplay.textContent = "100000";
      if (inputBusqueda) inputBusqueda.value = "";
      productosFiltrados = [...PRODUCTOS];
      renderizarProductos(productosFiltrados);
    });
  }

  document.addEventListener("DOMContentLoaded", () => {
    renderizarProductos(PRODUCTOS);
    actualizarContadorCarrito();
  });
}

if (document.querySelector("#producto-detalle")) {
  function cargarDetalleProducto() {
    const params = new URLSearchParams(window.location.search);
    const idProducto = parseInt(params.get("id"), 10);
    const producto = PRODUCTOS.find((p) => p.id === idProducto);

    if (!producto) {
      document.querySelector("#main-detalle").innerHTML = "<h1>Producto no encontrado</h1>";
      return;
    }

    document.querySelector("#prod-nombre").textContent = producto.nombre;
    document.querySelector("#prod-descripcion").textContent = producto.descripcion;
    document.querySelector("#prod-imagen").src = producto.imagen;
    document.querySelector("#prod-imagen").alt = producto.nombre;
    document.querySelector("#breadcrumb-producto").textContent = producto.nombre;
    document.title = producto.nombre + " - Mueblería Hermanos Jota";

    const disponibilidad = document.querySelector("#disponibilidad");
    if (producto.enStock) {
      disponibilidad.className = "disponibilidad en-stock";
      disponibilidad.textContent = "✓ En Stock (" + producto.cantidad + " disponibles)";
    } else {
      disponibilidad.className = "disponibilidad agotado";
      disponibilidad.textContent = "✗ Agotado";
    }

    const precioOriginal = document.querySelector("#prod-precio-original");
    const descuentoBadge = document.querySelector("#prod-descuento");

    if (producto.descuento > 0) {
      precioOriginal.innerHTML = "Precio original: <del>" + formatearMoneda(producto.precio) + "</del>";
      precioOriginal.style.display = "block";
      descuentoBadge.innerHTML = "<span class=\"descuento-badge\">-" + producto.descuento + "%</span>";
      descuentoBadge.style.display = "block";
    } else {
      precioOriginal.style.display = "none";
      descuentoBadge.style.display = "none";
    }

    document.querySelector("#prod-precio-final").textContent =
      "Precio: " + formatearMoneda(producto.precioFinal);

    const specsList = document.querySelector("#specs-list");
    specsList.innerHTML = "";
    Object.entries(producto.detalles).forEach(([clave, valor]) => {
      const dt = document.createElement("dt");
      const dd = document.createElement("dd");
      dt.textContent = clave.charAt(0).toUpperCase() + clave.slice(1) + ":";
      dd.textContent = valor;
      specsList.appendChild(dt);
      specsList.appendChild(dd);
    });

    const btnAgregar = document.querySelector("#btn-agregar-carrito");
    const inputCantidad = document.querySelector("#cantidad");

    if (producto.enStock) {
      btnAgregar.addEventListener("click", () => {
        const cantidad = parseInt(inputCantidad.value, 10);
        agregarAlCarrito(producto, cantidad);
        alert("✓ Producto añadido al carrito");
        inputCantidad.value = 1;
      });
    } else {
      btnAgregar.disabled = true;
      btnAgregar.textContent = "No disponible";
    }

    const relacionados = PRODUCTOS.filter((p) =>
      p.categoria === producto.categoria && p.id !== producto.id
    ).slice(0, 3);

    const gridRelacionados = document.querySelector("#relacionados");
    relacionados.forEach((p) => {
      gridRelacionados.appendChild(crearTarjetaProducto(p));
    });
  }

  document.addEventListener("DOMContentLoaded", () => {
    cargarDetalleProducto();
    actualizarContadorCarrito();
  });
}

document.addEventListener("DOMContentLoaded", () => {
  actualizarContadorCarrito();
});

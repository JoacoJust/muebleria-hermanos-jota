async function cargarCatalogo() {
  const contenedor = document.getElementById("grilla-productos");
  if (!contenedor) {
    return;
  }

  mostrarSpinner(contenedor);

  const data = await obtenerProductos();
  ocultarSpinner(contenedor);
  renderizarProductos(data, contenedor);

  const buscador = document.getElementById("buscador-productos");
  if (buscador) {
    buscador.addEventListener("input", function () {
      const termino = buscador.value.toLowerCase().trim();
      const filtrados = data.filter(function (producto) {
        return (
          producto.nombre.toLowerCase().includes(termino) ||
          producto.categoria.toLowerCase().includes(termino) ||
          producto.descripcion.toLowerCase().includes(termino)
        );
      });
      renderizarProductos(filtrados, contenedor);
    });
  }
}

function renderizarProductos(listaProductos, contenedor) {
  contenedor.innerHTML = "";

  if (listaProductos.length === 0) {
    const mensaje = document.createElement("p");
    mensaje.className = "mensaje-vacio";
    mensaje.textContent = "No se encontraron productos.";
    contenedor.appendChild(mensaje);
    return;
  }

  for (let i = 0; i < listaProductos.length; i++) {
    const tarjeta = crearTarjetaProducto(listaProductos[i]);
    contenedor.appendChild(tarjeta);
  }
}

document.addEventListener("DOMContentLoaded", cargarCatalogo);

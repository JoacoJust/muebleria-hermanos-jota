// Ejercicio 4: Generador de lista de productos

const cantidadProductos = parseInt(prompt("¿Cuántos productos desea agregar a la lista?"), 10);

if (isNaN(cantidadProductos) || cantidadProductos < 1) {
  console.log("No se ingresó una cantidad válida de productos.");
} else {
  for (let i = 1; i <= cantidadProductos; i++) {
    console.log("Producto #" + i + " agregado");
  }

  console.log("Se han agregado " + cantidadProductos + " productos a la lista.");
}

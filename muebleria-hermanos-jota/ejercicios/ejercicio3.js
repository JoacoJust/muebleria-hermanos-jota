// Ejercicio 3: Simulador de carrito de compras

let totalCompra = 0;

while (confirm("¿Desea agregar un producto al carrito?")) {
  const valorIngresado = prompt("Ingrese el valor del producto:");
  const valorProducto = parseFloat(valorIngresado);

  if (!isNaN(valorProducto)) {
    totalCompra = totalCompra + valorProducto;
  } else {
    alert("El valor ingresado no es un número válido.");
  }
}

alert("El total de su compra es: $" + totalCompra);

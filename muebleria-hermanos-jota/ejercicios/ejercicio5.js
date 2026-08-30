// Ejercicio 5: Función reutilizable para calcular descuentos

function aplicarDescuento(precio, porcentajeDescuento) {
  const montoDescuento = precio * (porcentajeDescuento / 100);
  return precio - montoDescuento;
}

const precioMesa = 20000;
const precioSofa = 80000;

const precioFinalMesa = aplicarDescuento(precioMesa, 10);
const precioFinalSofa = aplicarDescuento(precioSofa, 25);

console.log("Precio original de la mesa: $" + precioMesa + ". Descuento: 10%. Precio final: $" + precioFinalMesa);
console.log("Precio original del sofá: $" + precioSofa + ". Descuento: 25%. Precio final: $" + precioFinalSofa);

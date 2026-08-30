// Ejercicio 1: Calculadora de precios

const precioBaseSilla = 4500.50;
const iva = 0.21;

const valorIva = precioBaseSilla * iva;
const precioFinal = precioBaseSilla + valorIva;

console.log("Precio Base de la Silla: $" + precioBaseSilla);
console.log("IVA: $" + valorIva);
console.log("Precio Final: $" + precioFinal);

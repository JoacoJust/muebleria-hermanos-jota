const productos = [
  {
    id: 1,
    nombre: "Mesa de comedor Roble",
    descripcion: "Mesa extensible de madera maciza ideal para reuniones familiares.",
    precio: 185000,
    imagen: "img/mesa-roble.svg",
    categoria: "Comedor",
    detalleFabricacion: "Madera de roble maciza, terminación natural con barniz al agua. Medidas: 160x90 cm (extensible a 220 cm). Patas de acero pintado en negro mate.",
    destacado: true
  },
  {
    id: 2,
    nombre: "Sillón Chesterfield",
    descripcion: "Sillón de tres cuerpos con capitoné clásico y estructura reforzada.",
    precio: 320000,
    imagen: "img/sillon-chesterfield.svg",
    categoria: "Living",
    detalleFabricacion: "Estructura de madera de pino, tapizado en cuero sintético premium. Respaldo capitoné a mano. Medidas: 210x90x85 cm.",
    destacado: true
  },
  {
    id: 3,
    nombre: "Escritorio Nórdico",
    descripcion: "Escritorio minimalista con cajones integrados para home office.",
    precio: 95000,
    imagen: "img/escritorio-nordico.svg",
    categoria: "Oficina",
    detalleFabricacion: "MDF enchapado en roble claro, herrajes metálicos cromados. Incluye 2 cajones con correderas suaves. Medidas: 120x60x75 cm.",
    destacado: true
  },
  {
    id: 4,
    nombre: "Estantería Industrial",
    descripcion: "Estantería de cinco niveles con estilo industrial y gran capacidad.",
    precio: 78000,
    imagen: "img/estanteria-industrial.svg",
    categoria: "Living",
    detalleFabricacion: "Estructura de acero negro con estantes de madera maciza de pino. Capacidad de carga: 15 kg por nivel. Medidas: 180x80x35 cm.",
    destacado: true
  },
  {
    id: 5,
    nombre: "Silla Eames",
    descripcion: "Silla de diseño icónico con asiento ergonómico y patas de madera.",
    precio: 45000,
    imagen: "img/silla-eames.svg",
    categoria: "Comedor",
    detalleFabricacion: "Asiento de polipropileno reforzado, patas de madera de haya curvada. Apilable. Medidas: 46x52x82 cm.",
    destacado: false
  },
  {
    id: 6,
    nombre: "Cama Queen Platform",
    descripcion: "Cama plataforma baja con cabecera tapizada y diseño contemporáneo.",
    precio: 210000,
    imagen: "img/cama-queen.svg",
    categoria: "Dormitorio",
    detalleFabricacion: "Estructura de madera de pino, cabecera tapizada en lino gris. Compatible con colchón Queen (160x200 cm).",
    destacado: false
  },
  {
    id: 7,
    nombre: "Mesa ratona Centro",
    descripcion: "Mesa ratona de diseño con doble nivel y terminación en nogal.",
    precio: 62000,
    imagen: "img/mesa-ratona.svg",
    categoria: "Living",
    detalleFabricacion: "MDF enchapado en nogal, patas cónicas de madera. Dos niveles de almacenamiento. Medidas: 100x50x45 cm.",
    destacado: false
  },
  {
    id: 8,
    nombre: "Armario 3 puertas",
    descripcion: "Armario amplio con espejo central y organización interior completa.",
    precio: 275000,
    imagen: "img/armario.svg",
    categoria: "Dormitorio",
    detalleFabricacion: "Melamina blanca de 18 mm, herrajes de cierre suave. Incluye barral, estantes y cajonera. Medidas: 180x220x60 cm.",
    destacado: false
  }
];

function obtenerProductos() {
  return new Promise(function (resolve) {
    setTimeout(function () {
      resolve(productos);
    }, 800);
  });
}

function obtenerProductoPorId(id) {
  return productos.find(function (producto) {
    return producto.id === id;
  });
}

function formatearPrecio(precio) {
  return "$ " + precio.toLocaleString("es-AR");
}

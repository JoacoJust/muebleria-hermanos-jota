const PRODUCTOS = [
  {
    id: 1,
    nombre: "Silla Ejecutiva Premium",
    categoria: "sillas",
    precio: 25000,
    descuento: 10,
    precioFinal: 22500,
    imagen: "assets/imagenes/silla-ejecutiva.jpg",
    descripcion: "Silla ergonómica con soporte lumbar ajustable",
    detalles: {
      material: "Cuero sintético + malla transpirable",
      alto: "110 cm",
      ancho: "65 cm",
      profundidad: "60 cm",
      peso: "15 kg",
      fabricacion: "Importada de Italia"
    },
    enStock: true,
    cantidad: 8
  },
  {
    id: 2,
    nombre: "Silla Eames Clásica",
    categoria: "sillas",
    precio: 18000,
    descuento: 0,
    precioFinal: 18000,
    imagen: "assets/imagenes/silla-eames.jpg",
    descripcion: "Silla de diseño icónico con asiento ergonómico y patas de madera",
    detalles: {
      material: "Polipropileno reforzado + madera de haya",
      alto: "82 cm",
      ancho: "46 cm",
      profundidad: "52 cm",
      peso: "4 kg",
      fabricacion: "Hecha en Buenos Aires"
    },
    enStock: true,
    cantidad: 15
  },
  {
    id: 3,
    nombre: "Mesa Centro Moderna",
    categoria: "mesas",
    precio: 18000,
    descuento: 0,
    precioFinal: 18000,
    imagen: "assets/imagenes/mesa-centro.jpg",
    descripcion: "Mesa de centro de cristal templado con base de madera",
    detalles: {
      material: "Cristal templado + madera roble",
      alto: "45 cm",
      ancho: "120 cm",
      profundidad: "60 cm",
      peso: "22 kg",
      fabricacion: "Hecha a medida en Buenos Aires"
    },
    enStock: true,
    cantidad: 5
  },
  {
    id: 4,
    nombre: "Mesa de Comedor Roble",
    categoria: "mesas",
    precio: 85000,
    descuento: 15,
    precioFinal: 72250,
    imagen: "assets/imagenes/mesa-comedor.jpg",
    descripcion: "Mesa extensible de madera maciza ideal para reuniones familiares",
    detalles: {
      material: "Madera de roble maciza",
      alto: "75 cm",
      ancho: "160 cm",
      profundidad: "90 cm",
      peso: "45 kg",
      fabricacion: "Fabricación artesanal en CABA"
    },
    enStock: true,
    cantidad: 3
  },
  {
    id: 5,
    nombre: "Mesa Ratona Centro",
    categoria: "mesas",
    precio: 32000,
    descuento: 5,
    precioFinal: 30400,
    imagen: "assets/imagenes/mesa-ratona.jpg",
    descripcion: "Mesa ratona de diseño con doble nivel y terminación en nogal",
    detalles: {
      material: "MDF enchapado en nogal",
      alto: "45 cm",
      ancho: "100 cm",
      profundidad: "50 cm",
      peso: "18 kg",
      fabricacion: "Hecha en Buenos Aires"
    },
    enStock: true,
    cantidad: 7
  },
  {
    id: 6,
    nombre: "Sillón Chesterfield",
    categoria: "sofas",
    precio: 120000,
    descuento: 20,
    precioFinal: 96000,
    imagen: "assets/imagenes/sillon-chesterfield.jpg",
    descripcion: "Sillón de tres cuerpos con capitoné clásico y estructura reforzada",
    detalles: {
      material: "Cuero sintético premium + madera de pino",
      alto: "85 cm",
      ancho: "210 cm",
      profundidad: "90 cm",
      peso: "55 kg",
      fabricacion: "Importado de Inglaterra"
    },
    enStock: true,
    cantidad: 2
  },
  {
    id: 7,
    nombre: "Sofá Modular 3 Cuerpos",
    categoria: "sofas",
    precio: 95000,
    descuento: 0,
    precioFinal: 95000,
    imagen: "assets/imagenes/sofa-modular.jpg",
    descripcion: "Sofá modular contemporáneo con tapizado antimanchas",
    detalles: {
      material: "Tela antimanchas + espuma HR",
      alto: "88 cm",
      ancho: "220 cm",
      profundidad: "95 cm",
      peso: "48 kg",
      fabricacion: "Hecho en Buenos Aires"
    },
    enStock: true,
    cantidad: 4
  },
  {
    id: 8,
    nombre: "Escritorio Nórdico",
    categoria: "escritorios",
    precio: 45000,
    descuento: 10,
    precioFinal: 40500,
    imagen: "assets/imagenes/escritorio-nordico.jpg",
    descripcion: "Escritorio minimalista con cajones integrados para home office",
    detalles: {
      material: "MDF enchapado en roble claro",
      alto: "75 cm",
      ancho: "120 cm",
      profundidad: "60 cm",
      peso: "28 kg",
      fabricacion: "Hecho en Buenos Aires"
    },
    enStock: true,
    cantidad: 6
  },
  {
    id: 9,
    nombre: "Escritorio Gamer Pro",
    categoria: "escritorios",
    precio: 68000,
    descuento: 0,
    precioFinal: 68000,
    imagen: "assets/imagenes/escritorio-gamer.jpg",
    descripcion: "Escritorio amplio con soporte para monitor y gestión de cables",
    detalles: {
      material: "MDF + acero reforzado",
      alto: "75 cm",
      ancho: "140 cm",
      profundidad: "70 cm",
      peso: "32 kg",
      fabricacion: "Hecho en Buenos Aires"
    },
    enStock: false,
    cantidad: 0
  },
  {
    id: 10,
    nombre: "Estantería Industrial",
    categoria: "estanterias",
    precio: 38000,
    descuento: 0,
    precioFinal: 38000,
    imagen: "assets/imagenes/estanteria-industrial.jpg",
    descripcion: "Estantería de cinco niveles con estilo industrial y gran capacidad",
    detalles: {
      material: "Acero negro + madera de pino",
      alto: "180 cm",
      ancho: "80 cm",
      profundidad: "35 cm",
      peso: "25 kg",
      fabricacion: "Hecha en Buenos Aires"
    },
    enStock: true,
    cantidad: 10
  },
  {
    id: 11,
    nombre: "Estantería Modular 3 Puertas",
    categoria: "estanterias",
    precio: 72000,
    descuento: 12,
    precioFinal: 63360,
    imagen: "assets/imagenes/estanteria-modular.jpg",
    descripcion: "Armario amplio con espejo central y organización interior completa",
    detalles: {
      material: "Melamina blanca de 18 mm",
      alto: "220 cm",
      ancho: "180 cm",
      profundidad: "60 cm",
      peso: "65 kg",
      fabricacion: "Hecho en Buenos Aires"
    },
    enStock: true,
    cantidad: 3
  },
  {
    id: 12,
    nombre: "Biblioteca Clásica",
    categoria: "estanterias",
    precio: 55000,
    descuento: 8,
    precioFinal: 50600,
    imagen: "assets/imagenes/biblioteca.jpg",
    descripcion: "Biblioteca de pared con estantes ajustables y diseño clásico",
    detalles: {
      material: "Madera de pino maciza",
      alto: "200 cm",
      ancho: "100 cm",
      profundidad: "30 cm",
      peso: "40 kg",
      fabricacion: "Fabricación artesanal en CABA"
    },
    enStock: true,
    cantidad: 5
  }
];

function calcularPrecioFinal(precio, descuento) {
  return precio - (precio * descuento / 100);
}

function formatearMoneda(valor) {
  return new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS"
  }).format(valor);
}

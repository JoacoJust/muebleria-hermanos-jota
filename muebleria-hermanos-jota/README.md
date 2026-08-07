# Mueblería Hermanos Jota

Sitio web de e-commerce frontend para la materia de Desarrollo Web del ITBA (Sprint 1 y 2).

## Integrante

| Nombre | GitHub |
|--------|--------|
| Joaquín Just | [@JoacoJust](https://github.com/JoacoJust) |

> Proyecto individual: un solo integrante en el equipo.

## Descripción

Fachada completa de un e-commerce de muebles llamado **Mueblería Hermanos Jota**. El sitio simula una experiencia de compra sin backend: el catálogo se gestiona con un array de objetos en JavaScript, el carrito persiste en `localStorage`, y la carga de productos simula latencia de red con `async/await` y `Promise`.

### Páginas

- **index.html** — Hero banner + productos destacados (carga dinámica)
- **productos.html** — Grilla completa con buscador en tiempo real
- **producto.html** — Detalle individual según parámetro `?id=X`
- **contacto.html** — Formulario con validación del lado del cliente

## Tecnologías

- HTML5 semántico
- CSS3 (Mobile First, Flexbox)
- JavaScript vanilla (ES6+)

## Cómo correrlo localmente

1. Clonar el repositorio:
   ```bash
   git clone https://github.com/JoacoJust/muebleria-hermanos-jota.git
   ```
2. Abrir la carpeta del proyecto en VS Code / Cursor.
3. Instalar la extensión **Live Server** (si no la tenés).
4. Click derecho en `index.html` → **Open with Live Server**.
5. El sitio se abre en `http://127.0.0.1:5500`.

No requiere npm, build tools ni backend.

## Sitio desplegado

**https://joacojust.github.io/muebleria-hermanos-jota/**

Hosting: GitHub Pages (rama `main`, carpeta raíz).

## Estructura del proyecto

```
/
├── index.html
├── productos.html
├── producto.html
├── contacto.html
├── css/
│   └── estilos.css
├── js/
│   ├── productos.js
│   ├── main.js
│   ├── productos-page.js
│   ├── producto-page.js
│   └── contacto.js
├── img/
│   └── ...
└── README.md
```

## Checklist de entrega (Sprint 1 y 2)

- [x] 4 páginas HTML con etiquetas semánticas
- [x] Catálogo en array de objetos (`js/productos.js`)
- [x] Renderizado dinámico via DOM
- [x] Carga asíncrona simulada con spinner
- [x] Buscador en tiempo real
- [x] Detalle de producto por `?id=X`
- [x] Carrito simulado con contador persistente
- [x] Validación de formulario de contacto
- [x] CSS responsivo mobile-first con Flexbox
- [x] Repositorio en GitHub
- [x] Sitio desplegado en GitHub Pages

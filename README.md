# Mueblería Hermanos Jota

E-commerce frontend para el Curso de Desarrollo Web Full Stack del ITBA (Sprint 1 y 2).

## Integrantes

| Nombre | GitHub |
|--------|--------|
| Joaquín Just | [@JoacoJust](https://github.com/JoacoJust) |
| Ruiz Diaz Agostina | [@ruizdiazagostina](https://github.com/ruizdiazagostina) |
| Marcos Ford | [@MarcosFord5](https://github.com/MarcosFord5) |
| Rocio Lazo | [@Rociolazo](https://github.com/Rociolazo) |

> Proyecto grupal: Cuatro integrantes en el equipo.

## Descripción

Fachada completa de un e-commerce de muebles **sin backend**. El catálogo se gestiona con un array de objetos en `js/datos.js`, el carrito persiste en `localStorage`, y la interfaz se renderiza dinámicamente con JavaScript.

### Funcionalidades

- Catálogo de 12+ productos con categorías, precios y descuentos
- Página de inicio con productos destacados
- Buscador en tiempo real y filtros por categoría y precio
- Detalle de producto individual (`?id=X`)
- Carrito de compras con persistencia en `localStorage`
- Formulario de contacto con validación del lado del cliente
- Diseño responsivo Mobile First

### Páginas

- **index.html** — Hero + productos destacados
- **productos.html** — Catálogo con buscador y filtros
- **producto.html** — Detalle individual (`?id=X`)
- **contacto.html** — Formulario con validación
- **carrito.html** — Carrito de compras completo

## Tecnologías

- HTML5 semántico
- CSS3 Mobile First + Flexbox
- JavaScript ES6+ vanilla
- localStorage + JSON para persistencia local

## Sitio desplegado

**https://joacojust.github.io/muebleria-hermanos-jota/**

Hosting: GitHub Pages (rama `main`, carpeta raíz).

## Repositorio

**https://github.com/JoacoJust/muebleria-hermanos-jota**

## Cómo correrlo localmente

1. Clonar el repositorio:
   ```bash
   git clone https://github.com/JoacoJust/muebleria-hermanos-jota.git
   ```
2. Abrir la carpeta del proyecto en Visual Studio Code.
3. Instalar la extensión **Live Server** (si no la tenés).
4. Click derecho en `index.html` → **Open with Live Server**.
5. El sitio se abre en `http://127.0.0.1:5500`.

No requiere npm, build tools ni backend.

## Estructura del proyecto

```
/
├── index.html
├── productos.html
├── producto.html
├── contacto.html
├── carrito.html
├── css/
│   └── style.css
├── js/
│   ├── datos.js
│   ├── app.js
│   ├── main.js
│   ├── productos.js
│   ├── productos-page.js
│   ├── producto-page.js
│   ├── carrito.js
│   ├── contacto.js
│   └── validacion.js
├── assets/
│   └── imagenes/
├── img/
└── README.md
```

## Checklist de entrega

- [x] Repositorio en GitHub con historial de commits
- [x] Sitio desplegado en GitHub Pages
- [x] README con nombre, integrantes, descripción y tecnologías
- [x] 5 páginas HTML semánticas
- [x] CSS único Mobile First
- [x] JavaScript dinámico con arrays y DOM
- [x] Carrito funcional con localStorage
- [x] Formulario con validación

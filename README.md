# Mueblería Hermanos Jota

E-commerce de muebles artesanales (Buenos Aires). Monorepo **Sprint 3-4**: API REST en Node/Express y SPA en React.

[![CI](https://img.shields.io/badge/CI-GitHub%20Actions-33251F)](.github/workflows/ci.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-A0522D.svg)](LICENSE)

## Equipo

| Nombre             | GitHub                                                   |
| ------------------ | -------------------------------------------------------- |
| Joaquín Just       | [@JoacoJust](https://github.com/JoacoJust)               |
| Ruiz Diaz Agostina | [@ruizdiazagostina](https://github.com/ruizdiazagostina) |
| Marcos Ford        | [@MarcosFord5](https://github.com/MarcosFord5)           |
| Rocio Lazo         | [@Rociolazo](https://github.com/Rociolazo)               |

## De qué trata

Catálogo, detalle, carrito (estado React + `localStorage`) y contacto. Los productos salen de `GET /api/productos`; el cliente no usa el array estático.

**Estadio:** Sprint 3-4 (ITBA). El sitio HTML/JS anterior quedó en `legacy/` como referencia. `POST /api/contacto` y pedidos no están implementados (el formulario simula el envío).

Demo anterior (estática): https://joacojust.github.io/muebleria-hermanos-jota/

## Stack

- Node.js 22, npm workspaces
- Backend: Express 4, cors, helmet, dotenv, Jest + Supertest
- Frontend: React 18 (CRA), React Router 6, Tailwind 3.4, React Hook Form + Zod, Testing Library
- Calidad: ESLint, Prettier, Husky, lint-staged, commitlint

## Arquitectura

```
/
├── backend/          API (puerto 4000), datos en data/productos.js
├── client/           SPA (puerto 3000, proxy a la API)
├── docs/             contrato, auditoría, kit de marca
├── legacy/           sitio estático Sprint 1-2
└── .github/workflows/ci.yml
```

Contrato: [docs/api-contract.md](docs/api-contract.md).

### Decisiones de arquitectura

- **ESLint 9 vs react-scripts**: ESLint 9 en la raíz choca con el plugin de ESLint de react-scripts 5. Se usa `DISABLE_ESLINT_PLUGIN=true` en los scripts `start` y `build` del cliente, ya que el lint corre aparte con `npm run lint`. Esto permite mantener un solo config de ESLint moderno en la raíz sin conflictos.

- **Context API vs props para el carrito**: La consigna original sugería "carrito como estado en App.js, contador en Navbar vía props". Sin embargo, se eligió Context API (`CartContext` + `useCart`) porque:
  - Evita prop drilling: el estado del carrito se usa en múltiples componentes (Navbar, ProductCard, CartPage, etc.)
  - Es el patrón recomendado en React para estado global que no requiere librerías externas
  - Mejora la mantenibilidad al desacoplar el estado de la jerarquía de componentes
  - El hook `useCart` centraliza la lógica de negocio (stock, localStorage, cálculo de envío)

- **Proxy de CRA**: El cliente usa `proxy: "http://localhost:4000"` en `package.json` para redirigir las peticiones a la API en desarrollo. En producción, `REACT_APP_API_URL` debe apuntar al origen de la API.

- **precioFinal calculado en el backend**: Según el contrato de API, `precioFinal` se calcula en el servidor como `precio - (precio * descuento / 100)`. Esto garantiza consistencia y evita que el cliente manipule precios.

- **Imágenes servidas por el backend**: Las imágenes se sirven desde `backend/public/images/` con `GET /images/<archivo>`. Esto permite control centralizado y futuras optimizaciones (CDN, cache, etc.).

## Requisitos

- Node.js >= 20 (recomendado 22, ver `.nvmrc`)
- npm

## Instalación

```bash
git clone https://github.com/JoacoJust/muebleria-hermanos-jota.git
cd muebleria-hermanos-jota
npm run install:all
cp backend/.env.example backend/.env
cp client/.env.example client/.env
```

En Windows PowerShell: `Copy-Item backend/.env.example backend/.env`

## Ejecución

```bash
npm run dev
```

- Cliente: http://localhost:3000
- API: http://localhost:4000 — `GET /api/health`, `GET /api/productos`

`REACT_APP_API_URL` vacío usa el proxy de CRA. En un build de producción, apuntar al origen de la API.

## Scripts

| Comando               | Qué hace                  |
| --------------------- | ------------------------- |
| `npm run install:all` | Instala raíz + workspaces |
| `npm run dev`         | API (nodemon) + React     |
| `npm test`            | Jest backend y cliente    |
| `npm run lint`        | ESLint                    |
| `npm run format`      | Prettier                  |
| `npm run build`       | Build del cliente         |

## Tests

Backend: ids inválidos, 404, JSON malformado, helmet, imágenes. Cliente: lista (carga/error/vacío), `useCart` (stock, envío $50.000 / $50.001, `localStorage` corrupto), `ContactForm` (límites de Zod).

Plan adversarial: [docs/AUDITORIA.md](docs/AUDITORIA.md).

## Commits

Conventional Commits, forzados por Husky. Guía: [CONTRIBUTING.md](CONTRIBUTING.md). Uso de IA: [docs/USO-DE-IA.md](docs/USO-DE-IA.md).

## Roadmap

- Fotos reales del kit de marca en lugar de SVG de reemplazo
- `POST /api/contacto` según el contrato
- Checkout / `POST /api/pedidos` (fuera de esta entrega)
- Quitar `legacy/` cuando el equipo lo apruebe
- Agregar capturas de pantalla en `docs/screenshots/` (home, catálogo, detalle, carrito, contacto, móvil)

## Licencia

MIT. Ver [LICENSE](LICENSE).

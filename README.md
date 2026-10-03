# Mueblería Hermanos Jota

[![CI](https://img.shields.io/badge/CI-GitHub%20Actions-33251F)](.github/workflows/ci.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-A0522D.svg)](LICENSE)

Plataforma de e-commerce para muebles artesanales de fabricación argentina. Aplicación cliente-servidor desarrollada durante el Sprint 3-4 del curso de Desarrollo Web Full Stack (ITBA).

## Visión General

Mueblería Hermanos Jota es una tienda online que ofrece:

- **Catálogo interactivo** con filtrado por categoría, precio y búsqueda
- **Detalle de producto** con especificaciones técnicas completas
- **Carrito de compras** con gestión de stock y cálculo de envío
- **Formulario de contacto** con validación en tiempo real

La aplicación consta de dos servicios independientes que se comunican a través de una API REST.

## Equipo de Desarrollo

| Integrante         | GitHub                                                   |
| ------------------ | -------------------------------------------------------- |
| Joaquín Just       | [@JoacoJust](https://github.com/JoacoJust)               |
| Ruiz Diaz Agostina | [@ruizdiazagostina](https://github.com/ruizdiazagostina) |
| Marcos Ford        | [@MarcosFord5](https://github.com/MarcosFord5)           |
| Rocio Lazo         | [@Rociolazo](https://github.com/Rociolazo)               |
| Leandro Avalos     | [@Leandro-Gast](https://github.com/Leandro-Gast)         |

## Stack Tecnológico

### Backend

- **Runtime**: Node.js 22
- **Framework**: Express 4.x
- **Seguridad**: CORS, Helmet
- **Testing**: Jest + Supertest
- **Herramientas**: dotenv, nodemon (desarrollo)

### Frontend

- **Framework**: React 18 (create-react-app)
- **Enrutamiento**: React Router 6.x
- **Estilos**: Tailwind CSS 3.4.x
- **Testing**: React Testing Library
- **Linting**: ESLint, Prettier

### Calidad de Código

- **Husky**: Git hooks pre-commit y commit-msg
- **lint-staged**: Linting automático en archivos staged
- **commitlint**: Validación de mensajes de commit (Conventional Commits)

## Arquitectura del Proyecto

```
/
├── backend/                 API REST (puerto 4000)
│   ├── data/               Datos de productos
│   ├── public/images/      Imágenes del catálogo
│   ├── controllers/        Lógica de negocio
│   ├── routes/             Definición de endpoints
│   └── middlewares/        Manejo de errores y logging
├── client/                  SPA React (puerto 3000)
│   ├── src/
│   │   ├── components/     Componentes UI
│   │   ├── pages/          Páginas de la aplicación
│   │   ├── hooks/          Custom hooks
│   │   └── utils/          Utilidades
│   └── public/             Assets estáticos
├── docs/                    Documentación
│   ├── api-contract.md     Contrato de la API
│   ├── AUDITORIA.md        Plan de pruebas adversariales
│   ├── USO-DE-IA.md        Registro de uso de IA
│   └── brand-kit/          Kit de marca oficial
└── .github/workflows/       CI/CD con GitHub Actions
```

### Flujo cliente-servidor

1. El navegador carga la SPA de React (puerto 3000).
2. Los hooks `useProducts` y `useProduct` piden los datos a la API con `fetch` (`GET /api/productos` y `GET /api/productos/:id`) y manejan los estados de carga, éxito y error.
3. El backend (puerto 4000) responde en JSON con el formato `{ success, data }`. Los errores devuelven `{ success: false, message, status }`.
4. Las imágenes de los productos se sirven desde el backend (`GET /images/<archivo>`).

## Decisiones de Diseño

- **Monorepo con workspaces de npm**: `backend/` y `client/` conviven en un mismo repositorio, comparten herramientas de calidad (ESLint, Prettier, Husky) y se levantan juntos con un solo comando (`npm run dev`).
- **API REST organizada por capas**: las rutas (`express.Router`) solo definen endpoints, los controladores contienen la lógica y los middlewares (logger, `notFound`, `errorHandler`) son globales y reutilizables.
- **Formato de respuesta uniforme**: todas las respuestas usan `{ success, data }` (los listados suman `count`) y los errores `{ success: false, message, status }`, para que el cliente maneje cualquier respuesta de la misma manera.
- **Precio final calculado en el servidor**: el campo `precioFinal` se deriva en el backend para que el cliente no repita la lógica de descuentos.
- **Validación del `:id`**: un id inválido (`abc`, `-1`, `0`, `1.5`) responde 400 y un id inexistente responde 404, para distinguir un pedido mal formado de un producto que no existe.
- **Estado del carrito en `App.js`**: el carrito se maneja con el hook `useCart`, llamado desde `App.js`. El contador del Navbar recibe el dato por props y el resto de las páginas lo reciben a través de `Outlet context` desde `Layout`, sin usar Context API.
- **React Router**: se usa para navegar entre inicio, catálogo, detalle, carrito y contacto con URLs propias. Dentro de cada vista se usa renderizado condicional para mostrar carga, error, "no existe" o el contenido.
- **Hooks personalizados para datos**: `useProducts` y `useProduct` encapsulan el `fetch`, cancelan la petición con `AbortController` al desmontar y ofrecen un botón de reintento ante errores.
- **Formulario de contacto controlado**: cada campo se maneja con `useState` y la validación está separada en `utils/validateContact.js`. El envío se simula hasta que exista `POST /api/contacto`.
- **Persistencia del carrito en `localStorage`**: con manejo de datos corruptos, para que el carrito no se pierda al recargar.
- **Seguridad básica**: Helmet para cabeceras HTTP, CORS limitado al origen del cliente y variables de entorno para la configuración.
- **Calidad de código**: Conventional Commits validados con commitlint y Husky, ESLint y Prettier, y CI en GitHub Actions.

## Características Técnicas

### Gestión de Estado

- El carrito se gestiona en `App.js` mediante el hook `useCart`
- Las props se distribuyen a través de `Outlet context` en `Layout`
- Persistencia en `localStorage` con manejo de errores

### Validación de Formularios

- Formulario de contacto con inputs controlados (`useState`)
- Validación personalizada en `utils/validateContact.js`
- Mensajes de error en español rioplatense

### Seguridad

- Headers de seguridad con Helmet
- Validación de inputs en backend y frontend
- Sin exposición de stacks en producción
- Variables de entorno para configuración sensible

### Imágenes

- Servidas desde el backend (`GET /images/<archivo>`)
- Fotos reales del kit de marca oficial
- Control centralizado para futuras optimizaciones (CDN, cache)

## Requisitos Previos

- Node.js >= 20 (recomendado 22)
- npm >= 9

## Instalación

```bash
# Clonar el repositorio
git clone https://github.com/JoacoJust/muebleria-hermanos-jota.git
cd muebleria-hermanos-jota

# Instalar dependencias (raíz, backend y client)
npm run install:all

# Configurar variables de entorno
copy backend\.env.example backend\.env
copy client\.env.example client\.env
```

En Windows PowerShell:

```powershell
Copy-Item backend/.env.example backend/.env
Copy-Item client/.env.example client/.env
```

## Ejecución

### Servicios Independientes

```bash
# Backend (API)
cd backend
npm run dev
# Disponible en http://localhost:4000

# Frontend (React), en otra terminal
cd client
npm start
# Disponible en http://localhost:3000
```

### Desarrollo Concurrente

```bash
npm run dev
```

Este comando inicia ambos servicios simultáneamente:

- Cliente: http://localhost:3000
- API: http://localhost:4000

## Scripts Disponibles

| Comando               | Descripción                               |
| --------------------- | ----------------------------------------- |
| `npm run install:all` | Instala dependencias de raíz y workspaces |
| `npm run dev`         | Inicia API y cliente en modo desarrollo   |
| `npm test`            | Ejecuta suite de tests completo           |
| `npm run lint`        | Ejecuta linter de código                  |
| `npm run format`      | Formatea código con Prettier              |
| `npm run build`       | Genera build de producción del cliente    |

## Testing

### Backend

- Validación de IDs inválidos
- Manejo de rutas inexistentes (404)
- JSON malformado (400)
- Headers de seguridad (Helmet)
- Serving de imágenes

### Frontend

- Estados de carga, error y vacío en listados
- Lógica del carrito (stock, envío $50.000/$50.001)
- Recuperación de `localStorage` corrupto
- Validación de formulario de contacto

El plan de pruebas adversariales está documentado en [docs/AUDITORIA.md](docs/AUDITORIA.md).

## Documentación

- **Contrato de API**: [docs/api-contract.md](docs/api-contract.md)
- **Auditoría**: [docs/AUDITORIA.md](docs/AUDITORIA.md)
- **Uso de IA**: [docs/USO-DE-IA.md](docs/USO-DE-IA.md)
- **Guía de Contribución**: [CONTRIBUTING.md](CONTRIBUTING.md)

## Estado del Proyecto

✅ **Proyecto completo y funcional** — Sprint 3-4 entregado.

Todos los requisitos implementados y verificados:

- ✅ API REST completa con tests (16/16 pasan)
- ✅ Frontend React con tests (29/29 pasan) y build exitoso
- ✅ Carrito de compras funcional con persistencia
- ✅ Formulario de contacto con validación
- ✅ Documentación completa (API, auditoría, uso de IA)
- ✅ CI/CD con GitHub Actions
- ✅ Código limpio con Conventional Commits

## Licencia

Este proyecto está licenciado bajo MIT License - ver [LICENSE](LICENSE) para detalles.

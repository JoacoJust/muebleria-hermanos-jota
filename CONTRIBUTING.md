# Cómo contribuir

Trabajamos en pareja con revisión humana: la IA propone, el equipo audita.

## Flujo

1. Rama desde `main`: `feat/alcance-corto` o `fix/descripcion`.
2. Commits con [Conventional Commits](https://www.conventionalcommits.org/): `feat:`, `fix:`, `docs:`, `style:`, `refactor:`, `test:`, `chore:`, `ci:`, `build:` (scope opcional, ej. `feat(api):`).
3. Abrí un Pull Request usando la plantilla. Otro integrante revisa antes de mergear.

Husky rechaza mensajes que no sigan la convención y corre ESLint/Prettier en el pre-commit.

## Cómo correr el proyecto

```bash
npm run install:all
cp backend/.env.example backend/.env
cp client/.env.example client/.env
npm run dev
```

- API: `http://localhost:4000`
- Cliente: `http://localhost:3000` (proxy a la API)

```bash
npm run lint
npm test
npm run build
```

## Contrato

No cambies rutas ni formas de respuesta sin actualizar `docs/api-contract.md` y acordarlo con el equipo.

# Sprint 2 — ITBA · Desarrollo Web (Mueblería Hermanos Jota)

Cinco ejercicios de CSS resueltos con HTML5 + CSS3 puros (sin frameworks, sin estilos inline).

| Ejercicio | Archivo | Concepto |
|---|---|---|
| 1 | `ejercicio-01/biografia.html` | Selectores de tipo, ID, clase y descendente |
| 2 | `ejercicio-02/tarjeta.html` | Modelo de cajas (margin / border / padding / contenido) |
| 3 | `ejercicio-03/galeria.html` | Flexbox + anchos en porcentaje (layout fluido) |
| 4 | `ejercicio-04/galeria-responsiva.html` | Mobile First + media query `min-width: 768px` |
| 5 | `ejercicio-05/hero.html` | `100vh` + centrado con Flexbox + media queries tipográficas |

Las imágenes compartidas están en `img/` (SVG propios, sin dependencias externas).

## Cómo verlos

Abrí cualquiera de los HTML en el navegador, o levantá un server local:

```bash
python3 -m http.server 8000
# luego: http://localhost:8000/ejercicio-01/biografia.html
```

## Checklist de auditoría (aplicada en los 5 ejercicios)

- Reset universal `*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }` al inicio de cada CSS.
- CSS externo vinculado con `<link rel="stylesheet" href="estilos.css">`; cero `style=""` y cero `<style>`.
- `<meta name="viewport" content="width=device-width, initial-scale=1.0">` en todos los `<head>`.
- Etiquetas semánticas (`<main>`, `<header>`) y `<div>` solo donde el ejercicio lo pide explícitamente.
- Imágenes con `width: 100%; height: auto; display: block;`.
- Media queries siempre con `min-width` (Mobile First), nunca `max-width`.
- Variables CSS en `:root` con la paleta del proyecto en vez de valores hardcodeados.
- Comentarios que explican el *porqué* de cada decisión, incluido un diagrama del Box Model en el ejercicio 2.
- Sin frameworks ni librerías externas.

# Auditoría adversarial

Casos pensados para romper backend y cliente. Completar la columna "Obtenido" al correr en máquina.

| Caso                       | Esperado                               | Obtenido                             | Estado                      | Corrección                                    |
| -------------------------- | -------------------------------------- | ------------------------------------ | --------------------------- | --------------------------------------------- |
| API caída, cliente abierto | Spinner y luego error + Reintentar     | A completar en `npm run dev` sin API | pendiente de prueba en vivo | `useProducts` captura `Failed to fetch`       |
| `GET /api/productos/abc`   | 400                                    | Cubierto por Jest                    | OK                          | `parsePositiveIntId`                          |
| `GET /api/productos/-1`    | 400                                    | Cubierto por Jest                    | OK                          | idem                                          |
| `GET /api/productos/99999` | 404                                    | Cubierto por Jest                    | OK                          |                                               |
| `GET /api/productos/1.5`   | 400                                    | Cubierto por Jest                    | OK                          |                                               |
| JSON malformado POST       | 400 `JSON malformado`                  | Cubierto por Jest                    | OK                          | `errorHandler`                                |
| Ruta inexistente           | 404 formato estándar                   | Cubierto por Jest                    | OK                          | `notFound`                                    |
| Imagen inexistente         | 404                                    | 404 JSON formato estándar            | OK                          | catch-all                                     |
| `localStorage` corrupto    | Carrito vacío, sin crash               | Cubierto por RTL                     | OK                          | `loadCart` try/catch                          |
| Cantidad negativa          | Se clampa a 1                          | Cubierto por `updateQuantity`        | OK                          | `Math.max(1, cantidad)`                       |
| Sin stock                  | Botón deshabilitado; `addToCart` no-op | Cubierto por test + UI               | OK                          |                                               |
| Doble clic en agregar      | No supera stock                        | Estado funcional en `setItems`       | OK                          |                                               |
| Viewport 320 px            | Layout usable, menú hamburguesa        | A completar en browser               | pendiente                   | Responsive con menú hamburguesa implementado  |
| Solo teclado               | Foco visible, skip link                | A completar                          | pendiente                   | Skip link en Layout, foco visible en Tailwind |
| Zoom 200 %                 | Sin solapamiento grave                 | A completar                          | pendiente                   | Uso de unidades relativas en Tailwind         |
| Stack en production        | No se envía                            | Cubierto por Jest                    | OK                          |                                               |
| Envío $50.000 vs $50.001   | $5.000 / gratis                        | Cubierto por tests                   | OK                          | `getShipping` usa `>`                         |

## Revisión estática

Buscado: `var`, `==`, `.then(`, keys por índice, `innerHTML`, `dangerouslySetInnerHTML`, estilos inline, `console.log` de depuración, URLs hardcodeadas, secretos. El logger del backend es la excepción permitida.

**Resultado:** No se encontraron antipatrones en el código activo (backend + client). Los usos de `var`, `innerHTML`, etc. están en `legacy/` (código antiguo de referencia) y en archivos de configuración/documentación.

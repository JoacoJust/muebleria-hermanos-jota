# Contrato de API — Hermanos Jota

Fuente de verdad para el backend. Cualquier cambio requiere acuerdo del equipo.

Base URL (desarrollo): `http://localhost:4000`

Formato de éxito: `{ "success": true, "data": ... }` (los listados suman `"count"`).

Formato de error: `{ "success": false, "message": "...", "status": <n> }` (`stack` solo si `NODE_ENV !== "production"` y el error es 500).

---

## Esquema `Producto`

| Campo         | Tipo                     | Notas                                                              |
| ------------- | ------------------------ | ------------------------------------------------------------------ |
| `id`          | number (entero positivo) | Identificador estable                                              |
| `nombre`      | string                   |                                                                    |
| `categoria`   | string                   | `sillas`, `mesas`, `sofas`, `escritorios`, `estanterias`           |
| `descripcion` | string                   |                                                                    |
| `precio`      | number                   | Precio de lista en ARS                                             |
| `descuento`   | number                   | Porcentaje 0–100                                                   |
| `precioFinal` | number                   | **Derivado** en el servidor: `precio - (precio * descuento / 100)` |
| `imagen`      | string                   | Ruta pública `/images/<archivo>`                                   |
| `detalles`    | object                   | `material`, `alto`, `ancho`, `profundidad`, `peso`, `fabricacion`  |
| `enStock`     | boolean                  |                                                                    |
| `cantidad`    | number                   | Unidades disponibles                                               |

---

## `GET /api/health`

Comprueba que el proceso está vivo.

**Respuesta 200**

```json
{
  "success": true,
  "data": {
    "status": "ok",
    "uptime": 12.34
  }
}
```

---

## `GET /api/productos`

Listado completo del catálogo.

**Respuesta 200**

```json
{
  "success": true,
  "count": 12,
  "data": [
    {
      "id": 1,
      "nombre": "Silla Ejecutiva Premium",
      "categoria": "sillas",
      "descripcion": "Silla ergonómica con soporte lumbar ajustable",
      "precio": 25000,
      "descuento": 10,
      "precioFinal": 22500,
      "imagen": "/images/silla-trabajo-belgrano.png",
      "detalles": {
        "material": "Cuero vacuno y malla transpirable",
        "alto": "110 cm",
        "ancho": "65 cm",
        "profundidad": "60 cm",
        "peso": "15 kg",
        "fabricacion": "Hecha en Buenos Aires"
      },
      "enStock": true,
      "cantidad": 8
    }
  ]
}
```

---

## `GET /api/productos/:id`

Producto por id.

**Parámetros:** `id` — entero positivo en base 10 (sin signo, sin decimales, sin notación científica).

**Respuesta 200**

```json
{
  "success": true,
  "data": {
    "id": 1,
    "nombre": "Silla Ejecutiva Premium"
  }
}
```

**400** — `:id` inválido (`abc`, `-1`, `0`, `1.5`, `1e3`, espacios)

```json
{
  "success": false,
  "message": "El id debe ser un entero positivo",
  "status": 400
}
```

**404** — no existe

```json
{
  "success": false,
  "message": "Producto no encontrado",
  "status": 404
}
```

---

## Errores globales

| Caso                       | Código | Cuerpo                                                                                             |
| -------------------------- | ------ | -------------------------------------------------------------------------------------------------- |
| Ruta inexistente           | 404    | `{ success: false, message, status: 404 }`                                                         |
| JSON malformado en el body | 400    | `{ success: false, message: "JSON malformado", status: 400 }`                                      |
| Error interno              | 500    | `{ success: false, message: "Error interno del servidor", status: 500 }` sin `stack` en producción |

Imágenes: `GET /images/<archivo>` — `200` y `Content-Type` de imagen si el archivo existe; si no, 404 del catch-all.

---

## Endpoints planificados (no implementados)

### `POST /api/contacto`

Recibe el formulario de contacto. El cliente simula el envío hasta que exista este endpoint.

### `POST /api/pedidos`

Checkout / pedido a partir del carrito. Fuera del alcance de esta entrega.

const API_BASE = process.env.REACT_APP_API_URL || "";

export async function apiGet(path, { signal } = {}) {
  const response = await fetch(`${API_BASE}${path}`, { signal });

  if (!response.ok) {
    let message = "No pudimos completar la solicitud";
    try {
      const body = await response.json();
      if (body && body.message) {
        message = body.message;
      }
    } catch {
      // respuesta no JSON
    }
    const error = new Error(message);
    error.status = response.status;
    throw error;
  }

  return response.json();
}

export function fetchProductos(options) {
  return apiGet("/api/productos", options);
}

export function fetchProducto(id, options) {
  return apiGet(`/api/productos/${id}`, options);
}

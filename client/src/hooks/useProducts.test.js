import { renderHook, waitFor } from "@testing-library/react";
import { useProducts } from "./useProducts";

describe("useProducts", () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  test("carga el catálogo cuando fetch es ok", async () => {
    jest.spyOn(global, "fetch").mockResolvedValue({
      ok: true,
      json: async () => ({ success: true, count: 1, data: [{ id: 1, nombre: "Silla" }] }),
    });

    const { result } = renderHook(() => useProducts());
    expect(result.current.loading).toBe(true);

    await waitFor(() => expect(result.current.loading).toBe(false));
    expect(result.current.error).toBeNull();
    expect(result.current.productos).toHaveLength(1);
  });

  test("guarda error si la API responde 500", async () => {
    jest.spyOn(global, "fetch").mockResolvedValue({
      ok: false,
      status: 500,
      json: async () => ({
        success: false,
        message: "Error interno del servidor",
        status: 500,
      }),
    });

    const { result } = renderHook(() => useProducts());
    await waitFor(() => expect(result.current.loading).toBe(false));
    expect(result.current.error).toBe("Error interno del servidor");
    expect(result.current.productos).toEqual([]);
  });

  test("guarda error si la red rechaza", async () => {
    jest.spyOn(global, "fetch").mockRejectedValue(new Error("Failed to fetch"));

    const { result } = renderHook(() => useProducts());
    await waitFor(() => expect(result.current.loading).toBe(false));
    expect(result.current.error).toBe("Failed to fetch");
  });
});

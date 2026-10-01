const request = require("supertest");
const path = require("path");
const errorHandler = require("../middlewares/errorHandler");

process.env.NODE_ENV = "test";
process.env.CLIENT_ORIGIN = "http://localhost:3000";

const app = require("../app");

describe("API Hermanos Jota", () => {
  test("GET /api/health responde ok", async () => {
    const res = await request(app).get("/api/health");
    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data.status).toBe("ok");
    expect(typeof res.body.data.uptime).toBe("number");
  });

  test("GET /api/productos devuelve 12 productos con precioFinal", async () => {
    const res = await request(app).get("/api/productos");
    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.count).toBe(12);
    expect(res.body.data).toHaveLength(12);
    const silla = res.body.data.find((item) => item.id === 1);
    expect(silla.precioFinal).toBe(22500);
    expect(silla.precio).toBe(25000);
    expect(silla.descuento).toBe(10);
  });

  test("GET /api/productos/1 responde 200", async () => {
    const res = await request(app).get("/api/productos/1");
    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data.id).toBe(1);
  });

  test("GET /api/productos/9999 responde 404", async () => {
    const res = await request(app).get("/api/productos/9999");
    expect(res.status).toBe(404);
    expect(res.body).toMatchObject({
      success: false,
      status: 404,
    });
  });

  test.each(["abc", "-1", "0", "1.5", "1e3", " "])(
    "GET /api/productos/%s responde 400",
    async (id) => {
      const res = await request(app).get(`/api/productos/${encodeURIComponent(id)}`);
      expect(res.status).toBe(400);
      expect(res.body.success).toBe(false);
      expect(res.body.status).toBe(400);
    },
  );

  test("ruta desconocida responde 404 con formato estándar", async () => {
    const res = await request(app).get("/api/no-existe");
    expect(res.status).toBe(404);
    expect(res.body).toMatchObject({
      success: false,
      status: 404,
    });
    expect(typeof res.body.message).toBe("string");
  });

  test("JSON malformado responde 400", async () => {
    const res = await request(app)
      .post("/api/productos")
      .set("Content-Type", "application/json")
      .send('{"roto":');
    expect(res.status).toBe(400);
    expect(res.body).toMatchObject({
      success: false,
      message: "JSON malformado",
      status: 400,
    });
  });

  test("errorHandler no expone stack en production", () => {
    const previous = process.env.NODE_ENV;
    process.env.NODE_ENV = "production";
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    errorHandler(new Error("secreto"), {}, res, () => {});
    process.env.NODE_ENV = previous;
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json.mock.calls[0][0].stack).toBeUndefined();
    expect(res.json.mock.calls[0][0].message).toBe("Error interno del servidor");
  });

  test("GET /images/silla-trabajo-belgrano.png sirve imagen", async () => {
    const res = await request(app).get("/images/silla-trabajo-belgrano.png");
    expect(res.status).toBe(200);
    expect(res.headers["content-type"]).toMatch(/^image\//);
  });

  test("helmet agrega cabeceras de seguridad", async () => {
    const res = await request(app).get("/api/health");
    expect(res.headers["x-content-type-options"]).toBe("nosniff");
    expect(res.headers["x-dns-prefetch-control"]).toBeDefined();
  });

  test("el archivo de datos existe junto a las imágenes", () => {
    expect(path.basename(path.join(__dirname, "..", "data", "productos.js"))).toBe("productos.js");
  });
});

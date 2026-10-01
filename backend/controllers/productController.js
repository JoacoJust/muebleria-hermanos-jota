const { productos, conPrecioFinal } = require("../data/productos");

function parsePositiveIntId(idParam) {
  if (!/^\d+$/.test(String(idParam))) {
    const error = new Error("El id debe ser un entero positivo");
    error.status = 400;
    throw error;
  }

  const id = Number(idParam);
  if (!Number.isInteger(id) || id <= 0) {
    const error = new Error("El id debe ser un entero positivo");
    error.status = 400;
    throw error;
  }

  return id;
}

function listProducts(req, res, next) {
  try {
    const data = productos.map(conPrecioFinal);
    res.status(200).json({
      success: true,
      count: data.length,
      data,
    });
  } catch (error) {
    next(error);
  }
}

function getProductById(req, res, next) {
  try {
    const id = parsePositiveIntId(req.params.id);
    const producto = productos.find((item) => item.id === id);

    if (!producto) {
      const error = new Error("Producto no encontrado");
      error.status = 404;
      throw error;
    }

    res.status(200).json({
      success: true,
      data: conPrecioFinal(producto),
    });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  listProducts,
  getProductById,
};

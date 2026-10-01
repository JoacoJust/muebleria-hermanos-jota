const express = require("express");
const { listProducts, getProductById } = require("../controllers/productController");

const productRoutes = express.Router();

productRoutes.get("/", listProducts);
productRoutes.get("/:id", getProductById);

module.exports = productRoutes;

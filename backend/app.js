const path = require("path");
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const env = require("./config/env");
const logger = require("./middlewares/logger");
const notFound = require("./middlewares/notFound");
const errorHandler = require("./middlewares/errorHandler");
const productRoutes = require("./routes/productRoutes");

const app = express();

app.use(
  helmet({
    // Las imágenes se piden desde el SPA en otro origen (puerto 3000).
    crossOriginResourcePolicy: { policy: "cross-origin" },
  }),
);
app.use(
  cors({
    origin: env.clientOrigin,
  }),
);
app.use(logger);
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

app.get("/api/health", (req, res) => {
  res.status(200).json({
    success: true,
    data: {
      status: "ok",
      uptime: process.uptime(),
    },
  });
});

app.use("/api/productos", productRoutes);

app.use(notFound);
app.use(errorHandler);

module.exports = app;

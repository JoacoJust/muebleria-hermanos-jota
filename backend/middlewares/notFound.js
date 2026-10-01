function notFound(req, res, next) {
  const error = new Error(`No se encontró ${req.originalUrl}`);
  error.status = 404;
  next(error);
}

module.exports = notFound;

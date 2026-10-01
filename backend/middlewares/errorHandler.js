function errorHandler(err, req, res, next) {
  void next;

  if (err instanceof SyntaxError && err.status === 400 && "body" in err) {
    res.status(400).json({
      success: false,
      message: "JSON malformado",
      status: 400,
    });
    return;
  }

  const status = err.status || err.statusCode || 500;
  const isServerError = status === 500;
  const payload = {
    success: false,
    message: isServerError ? "Error interno del servidor" : err.message,
    status,
  };

  if (process.env.NODE_ENV !== "production" && isServerError) {
    payload.stack = err.stack;
  }

  res.status(status).json(payload);
}

module.exports = errorHandler;

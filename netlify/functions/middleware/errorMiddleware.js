const notFound = (req, res, next) => {
  const error = new Error(`Recurso no encontrado - ${req.originalUrl}`);
  res.status(404);
  next(error);
}

const errorHandler = (err, req, res, next) => {
  let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  let msg = err.message;

  // Revisar errores específicos de mongoose
  if(err.name === 'CastError' && err.kind === 'ObjectId') {
      statusCode = 404;
      msg = 'Recurso no encontrado';
  };

  res.status(statusCode).json({
      msg,
      stack: process.env.NODE_ENV === 'production' ? null : err.stack
  });
}

export { notFound, errorHandler };

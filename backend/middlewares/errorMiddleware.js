const notFound = (req, res, next) => {
  const error = new Error(`Resource not found - ${req.originalUrl}`);
  res.status(404);
  next(error);
};

const errorHandler = (err, req, res, next) => {
  let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  let errorMessage = err.message;

  // If Mongoose not found error, set to 404 and change message
  if (err.name === "CastError" && err.kind === "ObjectId") {
    statusCode = 404;
    errorMessage = "Resource not found";
  }

  res.status(statusCode).json({
    message: errorMessage,
    stack: process.env.NODE_ENV === "development" ? err.stack : null,
  });
};

export { notFound, errorHandler };

export const errorHandler = (err, req, res, next) => {
  console.error(err.stack);
  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({
    success: false,
    message: err.message || "Server error",
  });
};

export const notFound = (req, res, next) => {
  res.status(404).json({ success: false, message: `Route ${req.originalUrl} not found` });
};

// Small helper so services can throw with a status code attached
export class AppError extends Error {
  constructor(message, statusCode = 500) {
    super(message);
    this.statusCode = statusCode;
  }
}
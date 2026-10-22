// backend/src/middleware/errorHandler.js

export const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  
  res.status(statusCode).json({
    success: false,
    status: statusCode,
    message: err.message || 'Internal Server Error',
    // Include stack trace only if we are in development mode
    stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
  });
};
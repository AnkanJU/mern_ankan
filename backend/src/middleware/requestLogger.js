// backend/src/middleware/requestLogger.js

export const requestLogger = (req, res, next) => {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] ${req.method} request made to: ${req.originalUrl}`);
  next(); // Pass control to the next middleware/route handler
};
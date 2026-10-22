import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { requestLogger } from './middleware/requestLogger.js';
import { errorHandler } from './middleware/errorHandler.js';
import taskRoutes from './routes/taskRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Core Middleware
app.use(cors());
app.use(express.json());
app.use(requestLogger); // Custom request logger

// API Routes Mounting
app.use('/api/v1/tasks', taskRoutes);

// Health Check Endpoint
app.get('/api/v1/health', (req, res) => {
  res.status(200).json({
    success: true,
    status: 'ONLINE',
    service: 'DevFlow API Gateway',
    timestamp: new Date().toISOString()
  });
});

// 404 Route Fallback
app.use((req, res, next) => {
  const error = new Error(`Endpoint not found: ${req.originalUrl}`);
  error.statusCode = 404;
  next(error);
});

// Global Error Handler Middleware (Must be last)
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`[server]: DevFlow API server running successfully on port ${PORT}`);
});
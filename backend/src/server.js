import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Health Check Endpoint
app.get('/api/v1/health', (req, res) => {
  res.status(200).json({
    success: true,
    status: 'ONLINE',
    service: 'DevFlow API Gateway',
    timestamp: new Date().toISOString()
  });
});

// Global Fallback for Unmatched Routes
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Endpoint not found on DevFlow server.'
  });
});

app.listen(PORT, () => {
  console.log(`[server]: DevFlow API server running successfully on port ${PORT}`);
});
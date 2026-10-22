// backend/src/routes/taskRoutes.js
import express from 'express';

const router = express.Router();

// Mock tasks dataset for now
const tasks = [
  { id: 1, title: 'Setup Database Schema', status: 'Completed' },
  { id: 2, title: 'Configure JWT Authentication', status: 'Pending' }
];

// GET /api/v1/tasks
router.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    count: tasks.length,
    data: tasks
  });
});

// POST /api/v1/tasks (Trigger a test error or success)
router.post('/', (req, res, next) => {
  const { title } = req.body;
  
  if (!title) {
    const error = new Error('Task title is required field.');
    error.statusCode = 400;
    return next(error); // Passes error to our global error handler
  }

  const newTask = { id: tasks.length + 1, title, status: 'Pending' };
  tasks.push(newTask);

  res.status(201).json({
    success: true,
    data: newTask
  });
});

export default router;
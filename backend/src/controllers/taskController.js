// backend/src/controllers/taskController.js
import Task from '../models/Task.js';

// @desc    Get all tasks
// @route   GET /api/v1/tasks
// @access  Public
export const getTasks = async (req, res, next) => {
  try {
    const tasks = await Task.find().populate('assignedTo', 'name email role');
    
    res.status(200).json({
      success: true,
      count: tasks.length,
      data: tasks
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Create a new task
// @route   POST /api/v1/tasks
// @access  Public
export const createTask = async (req, res, next) => {
  try {
    const { title, description, priority, assignedTo } = req.body;

    const task = await Task.create({
      title,
      description,
      priority,
      assignedTo: assignedTo || null
    });

    res.status(201).json({
      success: true,
      data: task
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update a task status or details
// @route   PUT /api/v1/tasks/:id
// @access  Public
export const updateTask = async (req, res, next) => {
  try {
    const { id } = req.params;

    const task = await Task.findByIdAndUpdate(id, req.body, {
      new: true, // Return the updated document
      runValidators: true // Run schema validations on update
    });

    if (!task) {
      const error = new Error(`Task not found with id of ${id}`);
      error.statusCode = 404;
      return next(error);
    }

    res.status(200).json({
      success: true,
      data: task
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete a task
// @route   DELETE /api/v1/tasks/:id
// @access  Public
export const deleteTask = async (req, res, next) => {
  try {
    const { id } = req.params;

    const task = await Task.findByIdAndDelete(id);

    if (!task) {
      const error = new Error(`Task not found with id of ${id}`);
      error.statusCode = 404;
      return next(error);
    }

    res.status(200).json({
      success: true,
      message: 'Task deleted successfully',
      data: {}
    });
  } catch (error) {
    next(error);
  }
};
const mongoose = require('mongoose');
const Task = require('../models/Task');

// @desc    Get all tasks
// @route   GET /api/tasks
// @access  Public
const getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find().sort({ createdAt: -1 });
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({
      message: 'Failed to retrieve tasks',
      error: error.message,
    });
  }
};

// @desc    Add a new task
// @route   POST /api/tasks
// @access  Public
const createTask = async (req, res) => {
  try {
    const { taskName } = req.body;

    if (!taskName || !taskName.trim()) {
      return res.status(400).json({
        message: 'Task name is required',
      });
    }

    const newTask = await Task.create({
      taskName: taskName.trim(),
      isCompleted: req.body.isCompleted ?? false,
    });

    res.status(201).json(newTask);
  } catch (error) {
    res.status(500).json({
      message: 'Failed to create task',
      error: error.message,
    });
  }
};

// @desc    Update task status or details
// @route   PUT /api/tasks/:id
// @access  Public
const updateTask = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        message: 'Invalid task ID format',
      });
    }

    const updates = {};
    if (typeof req.body.isCompleted !== 'undefined') {
      updates.isCompleted = Boolean(req.body.isCompleted);
    }
    if (typeof req.body.taskName !== 'undefined' && req.body.taskName.trim()) {
      updates.taskName = req.body.taskName.trim();
    }

    const updatedTask = await Task.findByIdAndUpdate(
      id,
      { $set: updates },
      { new: true, runValidators: true }
    );

    if (!updatedTask) {
      return res.status(404).json({
        message: 'Task not found',
      });
    }

    res.status(200).json(updatedTask);
  } catch (error) {
    res.status(500).json({
      message: 'Failed to update task',
      error: error.message,
    });
  }
};

// @desc    Delete a task
// @route   DELETE /api/tasks/:id
// @access  Public
const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        message: 'Invalid task ID format',
      });
    }

    const deletedTask = await Task.findByIdAndDelete(id);

    if (!deletedTask) {
      return res.status(404).json({
        message: 'Task not found',
      });
    }

    res.status(200).json({
      message: 'Task deleted successfully',
      task: deletedTask,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Failed to delete task',
      error: error.message,
    });
  }
};

module.exports = {
  getAllTasks,
  createTask,
  updateTask,
  deleteTask,
};

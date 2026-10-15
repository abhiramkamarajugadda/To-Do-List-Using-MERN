const mongoose = require('mongoose');

// Mongoose Schema for Task
// Schema fields: taskName, isCompleted, createdAt
const taskSchema = new mongoose.Schema(
  {
    taskName: {
      type: String,
      required: [true, 'Task name is required'],
      trim: true,
    },
    isCompleted: {
      type: Boolean,
      default: false,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    // Explicitly set collection name to 'tasks' in database 'todo_db'
    collection: 'tasks',
    versionKey: false,
  }
);

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;

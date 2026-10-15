import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  CheckCircle2,
  Circle,
  Trash2,
  PlusCircle,
  ListTodo,
  RefreshCw,
  AlertCircle,
  Clock,
  Sparkles,
} from 'lucide-react';
import './App.css';

// Base API URL pointing to the Node.js Express backend
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api/tasks';

function App() {
  const [tasks, setTasks] = useState([]);
  const [taskName, setTaskName] = useState('');
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('all'); // 'all' | 'pending' | 'completed'

  // Fetch all tasks from backend (GET /api/tasks)
  const fetchTasks = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get(API_URL);
      setTasks(response.data);
    } catch (err) {
      console.error('Error fetching tasks:', err);
      setError(
        err.response?.data?.message ||
        'Cannot connect to backend server. Make sure the Node.js server is running on port 5000.'
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // Add new task (POST /api/tasks)
  const handleAddTask = async (e) => {
    e.preventDefault();
    const trimmed = taskName.trim();
    if (!trimmed) return;

    try {
      setSubmitting(true);
      setError(null);
      const response = await axios.post(API_URL, {
        taskName: trimmed,
      });

      // Prepend newly added task
      setTasks((prev) => [response.data, ...prev]);
      setTaskName('');
    } catch (err) {
      console.error('Error adding task:', err);
      setError(err.response?.data?.message || 'Failed to add task.');
    } finally {
      setSubmitting(false);
    }
  };

  // Toggle task completion status (PUT /api/tasks/:id)
  const handleToggleTask = async (task) => {
    try {
      setError(null);
      const updatedStatus = !task.isCompleted;

      // Optimistic UI update
      setTasks((prev) =>
        prev.map((t) =>
          t._id === task._id ? { ...t, isCompleted: updatedStatus } : t
        )
      );

      const response = await axios.put(`${API_URL}/${task._id}`, {
        isCompleted: updatedStatus,
      });

      // Update with server confirmed data
      setTasks((prev) =>
        prev.map((t) => (t._id === task._id ? response.data : t))
      );
    } catch (err) {
      console.error('Error updating task:', err);
      setError('Failed to update task status.');
      // Revert on failure
      fetchTasks();
    }
  };

  // Delete task (DELETE /api/tasks/:id)
  const handleDeleteTask = async (id) => {
    try {
      setError(null);
      // Optimistic UI update
      setTasks((prev) => prev.filter((t) => t._id !== id));

      await axios.delete(`${API_URL}/${id}`);
    } catch (err) {
      console.error('Error deleting task:', err);
      setError('Failed to delete task.');
      // Revert on failure
      fetchTasks();
    }
  };

  // Formatting date helper
  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString(undefined, {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  // Filter tasks
  const filteredTasks = tasks.filter((task) => {
    if (filter === 'pending') return !task.isCompleted;
    if (filter === 'completed') return task.isCompleted;
    return true;
  });

  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((t) => t.isCompleted).length;
  const pendingTasks = totalTasks - completedTasks;

  return (
    <div className="app-container">
      <div className="todo-card">
        {/* Header Section */}
        <header className="app-header">
          <div className="badge-wrapper">
            <span className="tech-badge">MERN Stack</span>
            <span className="db-badge">MongoDB: todo_db</span>
          </div>
          <h1 className="app-title">
            <ListTodo className="title-icon" />
            My To-Do List
          </h1>
          <p className="app-subtitle">
            React.js frontend connected to Node.js / Express backend with MongoDB
          </p>
        </header>

        {/* Error notification banner */}
        {error && (
          <div className="error-banner" role="alert">
            <AlertCircle className="error-icon" size={20} />
            <div className="error-text">
              <strong>Connection Notice:</strong> {error}
            </div>
            <button
              className="retry-btn"
              onClick={fetchTasks}
              title="Retry fetching tasks"
            >
              <RefreshCw size={16} />
              Retry
            </button>
          </div>
        )}

        {/* Task Input Form */}
        <form className="task-form" onSubmit={handleAddTask}>
          <div className="input-group">
            <input
              type="text"
              id="task-input"
              className="task-input"
              placeholder="What needs to be done? Enter a task..."
              value={taskName}
              onChange={(e) => setTaskName(e.target.value)}
              disabled={submitting}
              autoFocus
            />
            <button
              type="submit"
              className="add-task-btn"
              disabled={!taskName.trim() || submitting}
              id="add-task-btn"
            >
              <PlusCircle size={18} />
              <span>{submitting ? 'Adding...' : 'Add Task'}</span>
            </button>
          </div>
        </form>

        {/* Task Stats & Filter Toolbar */}
        <div className="toolbar">
          <div className="stats-group">
            <span className="stat-pill total">
              Total: <strong>{totalTasks}</strong>
            </span>
            <span className="stat-pill pending">
              Pending: <strong>{pendingTasks}</strong>
            </span>
            <span className="stat-pill completed">
              Completed: <strong>{completedTasks}</strong>
            </span>
          </div>

          <div className="filters-group">
            <button
              type="button"
              className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
              onClick={() => setFilter('all')}
            >
              All
            </button>
            <button
              type="button"
              className={`filter-btn ${filter === 'pending' ? 'active' : ''}`}
              onClick={() => setFilter('pending')}
            >
              Pending
            </button>
            <button
              type="button"
              className={`filter-btn ${filter === 'completed' ? 'active' : ''}`}
              onClick={() => setFilter('completed')}
            >
              Completed
            </button>
          </div>
        </div>

        {/* Tasks List */}
        <div className="task-list-section">
          {loading ? (
            <div className="loading-state">
              <RefreshCw className="spinner-icon" size={28} />
              <p>Loading tasks from MongoDB...</p>
            </div>
          ) : filteredTasks.length === 0 ? (
            <div className="empty-state">
              <Sparkles className="empty-icon" size={42} />
              <h3>No tasks found</h3>
              <p>
                {filter === 'completed'
                  ? 'No completed tasks yet. Keep moving forward!'
                  : filter === 'pending'
                  ? 'All tasks are completed! Great job!'
                  : 'Your list is clear. Add a task above to get started!'}
              </p>
            </div>
          ) : (
            <ul className="tasks-list">
              {filteredTasks.map((task) => (
                <li
                  key={task._id}
                  className={`task-item ${task.isCompleted ? 'is-completed' : ''}`}
                >
                  <div className="task-main">
                    {/* Checkbox trigger for Mark as Completed */}
                    <button
                      type="button"
                      className="checkbox-btn"
                      onClick={() => handleToggleTask(task)}
                      aria-label={
                        task.isCompleted
                          ? 'Mark task as incomplete'
                          : 'Mark task as completed'
                      }
                      title={
                        task.isCompleted
                          ? 'Mark as Pending'
                          : 'Mark as Completed'
                      }
                    >
                      {task.isCompleted ? (
                        <CheckCircle2 className="check-icon checked" size={22} />
                      ) : (
                        <Circle className="check-icon unchecked" size={22} />
                      )}
                    </button>

                    {/* Task text and metadata */}
                    <div className="task-details">
                      <span className="task-text">{task.taskName}</span>
                      <div className="task-meta">
                        <Clock size={12} />
                        <span>{formatDate(task.createdAt)}</span>
                        <span className="status-tag">
                          {task.isCompleted ? 'Completed' : 'Pending'}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Action buttons */}
                  <div className="task-actions">
                    {/* Explicit Mark as Completed / Pending Button */}
                    <button
                      type="button"
                      className={`status-toggle-btn ${
                        task.isCompleted ? 'btn-completed' : 'btn-pending'
                      }`}
                      onClick={() => handleToggleTask(task)}
                      title={
                        task.isCompleted
                          ? 'Click to Mark as Pending'
                          : 'Click to Mark as Completed'
                      }
                    >
                      {task.isCompleted ? 'Mark Pending' : 'Mark as Completed'}
                    </button>

                    {/* Delete Task Button */}
                    <button
                      type="button"
                      className="delete-task-btn"
                      onClick={() => handleDeleteTask(task._id)}
                      title="Delete Task"
                      aria-label="Delete Task"
                    >
                      <Trash2 size={16} />
                      <span className="delete-btn-text">Delete</span>
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Footer info showing API route mapping */}
        <footer className="app-footer">
          <div className="api-info-strip">
            <span><strong>Backend API:</strong> <code>{API_URL}</code></span>
            <span><strong>Database:</strong> <code>todo_db.tasks</code></span>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default App;

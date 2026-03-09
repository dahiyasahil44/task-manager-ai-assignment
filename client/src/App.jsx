import { useEffect, useState } from 'react';
// import axios from 'axios';
import api from "./api/axios";

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [filter, setFilter] = useState('all');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Load tasks from backend on mount
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        setLoading(true);
        const res = await api.get('/tasks');
        setTasks(res.data);
        setError(null);
      } catch (err) {
        console.error(err);
        setError('Failed to load tasks');
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  const handleAddTask = async (e) => {
    e.preventDefault();
    const trimmed = newTask.trim();
    if (!trimmed) return;

    try {
      const res = await api.post('/tasks', {
        title: trimmed,
        status: 'pending',
        completed: false
      });
      setTasks((prev) => [res.data, ...prev]);
      setNewTask('');
      setError(null);
    } catch (err) {
      console.error(err);
      setError('Failed to add task');
    }
  };

  const toggleTask = async (id) => {
    try {
      const res = await api.patch(`/tasks/${id}/toggle`);
      setTasks((prev) =>
        prev.map((task) => (task._id === id ? res.data : task))
      );
      setError(null);
    } catch (err) {
      console.error(err);
      setError('Failed to update task');
    }
  };

  const deleteTask = async (id) => {
    try {
      await api.delete(`/tasks/${id}`);
      setTasks((prev) => prev.filter((task) => task._id !== id));
      setError(null);
    } catch (err) {
      console.error(err);
      setError('Failed to delete task');
    }
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === 'active') return !task.completed;
    if (filter === 'completed') return task.completed;
    return true;
  });

  const remainingCount = tasks.filter((t) => !t.completed).length;

  return (
    <div className="app">
      <header className="app-header">
        <h1>Task Manager</h1>
        <p className="subtitle">Simple tasks, clear overview.</p>
      </header>

      <main className="app-main">
        <section className="task-input-section">
          <form onSubmit={handleAddTask} className="task-form">
            <input
              type="text"
              placeholder="Add a new task..."
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
            />
            <button type="submit">Add</button>
          </form>
        </section>

        {error && <div className="empty-state">{error}</div>}

        <section className="task-controls">
          <div className="filters">
            <button
              className={filter === 'all' ? 'active' : ''}
              onClick={() => setFilter('all')}
            >
              All
            </button>
            <button
              className={filter === 'active' ? 'active' : ''}
              onClick={() => setFilter('active')}
            >
              Active
            </button>
            <button
              className={filter === 'completed' ? 'active' : ''}
              onClick={() => setFilter('completed')}
            >
              Completed
            </button>
          </div>
          <div className="summary">
            {remainingCount} task{remainingCount !== 1 ? 's' : ''} remaining
          </div>
        </section>

        <section className="task-list-section">
          {filteredTasks.length === 0 ? (
            <div className="empty-state">No tasks to show.</div>
          ) : (
            <ul className="task-list">
              {filteredTasks.map((task) => (
                <li
                  key={task._id}
                  className={`task-item ${task.completed ? 'completed' : ''}`}
                >
                  <label>
                    <input
                      type="checkbox"
                      checked={task.completed}
                      onChange={() => toggleTask(task._id)}
                    />
                    <span className="task-title">{task.title}</span>
                  </label>
                  <button
                    className="delete-button"
                    onClick={() => deleteTask(task._id)}
                    aria-label="Delete task"
                  >
                    ×
                  </button>
                </li>
              ))}
            </ul>
          )}

          {loading && <div className="empty-state">Loading tasks...</div>}
        </section>
      </main>
    </div>
  );
}


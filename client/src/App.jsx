import { useState } from 'react';

const initialTasks = [
  { id: 1, title: 'Set up backend API', completed: true },
  { id: 2, title: 'Create React frontend', completed: false },
  { id: 3, title: 'Wire up task actions', completed: false }
];

export default function App() {
  const [tasks, setTasks] = useState(initialTasks);
  const [newTask, setNewTask] = useState('');
  const [filter, setFilter] = useState('all');

  const handleAddTask = (e) => {
    e.preventDefault();
    const trimmed = newTask.trim();
    if (!trimmed) return;
    setTasks((prev) => [
      ...prev,
      { id: Date.now(), title: trimmed, completed: false }
    ]);
    setNewTask('');
  };

  const toggleTask = (id) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (id) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
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
                  key={task.id}
                  className={`task-item ${task.completed ? 'completed' : ''}`}
                >
                  <label>
                    <input
                      type="checkbox"
                      checked={task.completed}
                      onChange={() => toggleTask(task.id)}
                    />
                    <span className="task-title">{task.title}</span>
                  </label>
                  <button
                    className="delete-button"
                    onClick={() => deleteTask(task.id)}
                    aria-label="Delete task"
                  >
                    ×
                  </button>
                </li>
              ))}
            </ul>
          )}
        </section>
      </main>
    </div>
  );
}


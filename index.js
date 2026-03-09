const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Basic health check route
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Task Manager API is running' });
});

// Placeholder for future task routes
// app.use('/api/tasks', require('./routes/tasks'));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


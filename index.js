const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to database
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Basic health check route
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Task Manager API is running' });
});

// Task routes
app.use('/api/tasks', require('./routes/taskRoutes'));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


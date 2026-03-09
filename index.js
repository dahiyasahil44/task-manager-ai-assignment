const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const path = require("path");

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to database
connectDB();

// Middleware
app.use(cors({
  origin: "*"
}));
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

// Serve frontend build
app.use(express.static(path.join(__dirname, "client/dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client/dist/index.html"));
});
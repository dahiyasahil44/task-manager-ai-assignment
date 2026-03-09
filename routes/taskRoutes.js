const express = require('express');
const {
  createTask,
  getTasks,
  getTaskById,
  updateTask,
  deleteTask,
  toggleTaskStatus
} = require('../controllers/taskController');

const router = express.Router();

// CRUD routes
router.get('/', getTasks);
router.get('/:id', getTaskById);
router.post('/', createTask);
router.put('/:id', updateTask);
router.delete('/:id', deleteTask);

// Toggle completion / status
router.patch('/:id/toggle', toggleTaskStatus);

module.exports = router;


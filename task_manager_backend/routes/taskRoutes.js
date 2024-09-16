const express = require('express');
const taskController = require('../controllers/taskController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// POST route to create a task
router.post('/', authMiddleware, taskController.createTask);

// GET route to fetch tasks by project (query param)
router.get('/', authMiddleware, taskController.getTasks);

// PUT route to update a task by its ID
router.put('/:taskId', authMiddleware, taskController.updateTask);

module.exports = router;

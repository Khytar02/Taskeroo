const express = require('express');
const projectController = require('../controllers/projectController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/', authMiddleware, projectController.createProject);
router.get('/', authMiddleware, projectController.getProjects);
router.put('/:projectId', authMiddleware, projectController.updateProject);

module.exports = router; // Make sure you're exporting the router

const express = require('express');
const timeTrackingController = require('../controllers/timeTrackingController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// Start time tracking
router.post('/start', authMiddleware, timeTrackingController.startTimeTracking);

// Stop time tracking
router.post('/stop', authMiddleware, timeTrackingController.stopTimeTracking);

// Get all time logs for a task
router.get('/logs/:taskId', authMiddleware, timeTrackingController.getTimeLogsForTask);

// Get total time spent on a project
router.get('/total/:projectId', authMiddleware, timeTrackingController.getTotalTimeForProject);

module.exports = router;

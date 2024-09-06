const express = require('express');
const timeTrackingController = require('../controllers/timeTrackingController');
const authMiddleware = require('../middleware/authMiddleware'); // Authentication middleware

const router = express.Router();

// Start time tracking for a task
router.post('/start', authMiddleware, async (req, res) => {
    await timeTrackingController.startTracking(req, res);
  });

// Stop time tracking for a task
router.post('/stop', authMiddleware, async (req, res) => {
    await timeTrackingController.stopTracking(req, res);
  });

// Get all time logs for a task
router.get('/logs/:taskId', authMiddleware, async (req, res) => {
  await timeTrackingController.getTimeLogs(req, res);
});

// Get total time spent on a project
router.get('/total/:projectId', authMiddleware, async (req, res) => {
    await timeTrackingController.getTotalTimeForProject(req, res);
  });
  
module.exports = router;

const express = require('express');
const clockController = require('../controllers/clockController');
const authMiddleware = require('../middleware/authMiddleware'); // Ensure user is authenticated

const router = express.Router();

// Clock In route
router.post('/clock-in', authMiddleware, async (req, res) => {
  await clockController.clockIn(req, res);
});

// Clock Out route
router.post('/clock-out', authMiddleware, async (req, res) => {
  await clockController.clockOut(req, res);
});

module.exports = router;

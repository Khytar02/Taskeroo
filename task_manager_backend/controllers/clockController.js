const TimeEntry = require('../models/TimeEntry');
const { Op } = require('sequelize');

// Clock In
exports.clockIn = async (req, res) => {
  try {
    const userId = req.user; // Assume `req.user` contains the authenticated user's ID

    // Check if user has an active time entry without a clock-out time
    const existingEntry = await TimeEntry.findOne({
      where: {
        userId,
        clockOutTime: null,
      },
    });

    if (existingEntry) {
      return res.status(400).json({ msg: 'You have already clocked in without clocking out.' });
    }

    // Create a new time entry
    const newEntry = await TimeEntry.create({
      userId,
      clockInTime: new Date(),
    });

    res.status(201).json(newEntry);
  } catch (err) {
    console.error('Error during clock in:', err.message);
    res.status(500).send('Server error');
  }
};

// Clock Out
exports.clockOut = async (req, res) => {
  try {
    const userId = req.user; // Assume `req.user` contains the authenticated user's ID

    // Find the latest active time entry for the user
    const timeEntry = await TimeEntry.findOne({
      where: {
        userId,
        clockOutTime: null,
      },
      order: [['clockInTime', 'DESC']],
    });

    if (!timeEntry) {
      return res.status(400).json({ msg: 'No active clock-in entry found.' });
    }

    // Update the time entry with clock-out time
    timeEntry.clockOutTime = new Date();
    await timeEntry.save();

    res.status(200).json(timeEntry);
  } catch (err) {
    console.error('Error during clock out:', err.message);
    res.status(500).send('Server error');
  }
};

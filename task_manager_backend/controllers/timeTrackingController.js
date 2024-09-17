const TimeEntry = require('../models/TimeEntry');
const TimeLog = require('../models/TimeLog'); // Assuming you use TimeLog as well
const { Op } = require('sequelize'); // For querying the total time for a project

// Start time tracking
exports.startTimeTracking = async (req, res) => {
  const { projectId, taskId } = req.body;
  const userId = req.user; // Get userId from the middleware

  // Ensure userId is available
  if (!userId) {
    return res.status(400).json({ error: 'User not found in the request' });
  }

  try {
    const timeEntry = await TimeEntry.create({
      projectId,
      taskId,
      userId, // Include userId here
      startTime: new Date(),
    });
    res.status(201).json(timeEntry);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Stop time tracking
exports.stopTimeTracking = async (req, res) => {
  const { timeEntryId } = req.body;
  try {
    const timeEntry = await TimeEntry.findByPk(timeEntryId);
    if (!timeEntry) return res.status(404).json({ error: 'Time entry not found' });

    timeEntry.endTime = new Date(); // Set the endTime to the current date/time
    await timeEntry.save();
    res.status(200).json(timeEntry);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


// Get all time logs for a task
exports.getTimeLogsForTask = async (req, res) => {
  const { taskId } = req.params;
  try {
    const timeLogs = await TimeLog.findAll({ where: { taskId } });
    if (!timeLogs) {
      return res.status(404).json({ error: 'No time logs found for this task' });
    }
    res.status(200).json(timeLogs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get total time spent on a project
exports.getTotalTimeForProject = async (req, res) => {
  const { projectId } = req.params;
  try {
    const timeEntries = await TimeEntry.findAll({
      where: { projectId, endTime: { [Op.not]: null } },
    });

    if (!timeEntries || timeEntries.length === 0) {
      return res.status(404).json({ error: 'No time entries found for this project' });
    }

    // Calculate total time in milliseconds
    const totalTime = timeEntries.reduce((total, entry) => {
      const duration = new Date(entry.endTime) - new Date(entry.startTime);
      return total + duration;
    }, 0);

    res.status(200).json({ totalTime }); // Total time in milliseconds
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


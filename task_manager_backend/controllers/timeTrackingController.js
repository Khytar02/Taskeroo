const TimeEntry = require('../models/TimeEntry');

// Start time tracking for a project or task
exports.startTimeTracking = async (req, res) => {
  const { projectId, taskId } = req.body;
  try {
    const timeEntry = await TimeEntry.create({
      projectId,
      taskId,
      startTime: new Date(),
    });
    res.status(201).json(timeEntry);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Stop time tracking for a project or task
exports.stopTimeTracking = async (req, res) => {
  const { timeEntryId } = req.body;
  try {
    const timeEntry = await TimeEntry.findByPk(timeEntryId);
    if (!timeEntry) return res.status(404).json({ error: 'Time entry not found' });

    timeEntry.endTime = new Date();
    await timeEntry.save();
    res.status(200).json(timeEntry);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

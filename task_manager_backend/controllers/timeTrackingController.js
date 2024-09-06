const TimeLog = require('../models/TimeLog');
const TaskTime = require('../models/TaskTime');
const { Op } = require('sequelize');

// Start Time Tracking
exports.startTracking = async (req, res) => {
  const { taskId } = req.body;

  try {
    // Check if the task exists
    const task = await TaskTime.findByPk(taskId);
    if (!task) {
      return res.status(404).json({ msg: 'Task not found' });
    }

    // Check if there's already an active time log (without an end time)
    const existingLog = await TimeLog.findOne({
      where: {
        taskId,
        endTime: { [Op.is]: null }
      }
    });

    if (existingLog) {
      return res.status(400).json({ msg: 'Time tracking is already running for this task' });
    }

    // Create a new time log entry with the current start time
    const timeLog = await TimeLog.create({
      taskId,
      startTime: new Date()
    });

    res.status(201).json(timeLog);
  } catch (err) {
    console.error('Error starting time tracking:', err);
    res.status(500).json({msg: 'Server error'});
  }
};

// Stop Time Tracking
exports.stopTracking = async (req, res) => {
  const { taskId } = req.body;

  try {
    // Find the active time log for this task
    const timeLog = await TimeLog.findOne({
      where: {
        taskId,
        endTime: { [Op.is]: null }
      }
    });

    if (!timeLog) {
      return res.status(400).json({ msg: 'No active time log found for this task' });
    }

    // Update the time log with the current end time
    timeLog.endTime = new Date();
    await timeLog.save();

    res.status(200).json(timeLog);
  } catch (err) {
    console.error('Error stopping time tracking:', err.message);
    res.status(500).send('Server error');
  }
};


// Get All Time Logs for a Given Task
exports.getTimeLogs = async (req, res) => {
    const { taskId } = req.params;
  
    try {
      const timeLogs = await TimeLog.findAll({
        where: { taskId },
        order: [['startTime', 'DESC']]
      });
  
      res.status(200).json(timeLogs);
    } catch (err) {
      console.error('Error fetching time logs:', err.message);
      res.status(500).send('Server error');
    }
  };
  

// Get Total Time Spent on a Project
exports.getTotalTimeForProject = async (req, res) => {
  const { projectId } = req.params;

  try {
    const totalTime = await TimeLog.findAll({
      include: {
        model: TaskTime,
        where: { projectId }
      }
    });

    const totalMinutes = totalTime.reduce((sum, log) => {
      const start = new Date(log.startTime);
      const end = log.endTime ? new Date(log.endTime) : new Date();
      const duration = (end - start) / 1000 / 60; // Convert to minutes
      return sum + duration;
    }, 0);

    res.status(200).json({ totalMinutes });
  } catch (err) {
    console.error('Error fetching total time:', err.message);
    res.status(500).send('Server error');
  }
};

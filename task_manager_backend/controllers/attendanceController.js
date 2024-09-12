const Attendance = require('../models/Attendance');

// Clock in for a work shift (not tied to a project or task)
exports.clockIn = async (req, res) => {
  const { userId } = req.body;
  try {
    const attendanceEntry = await Attendance.create({ userId, startTime: new Date() });
    res.status(201).json(attendanceEntry);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Clock out for a work shift (not tied to a project or task)
exports.clockOut = async (req, res) => {
  const { entryId } = req.body;
  try {
    const attendanceEntry = await Attendance.findByPk(entryId);
    if (!attendanceEntry) return res.status(404).json({ error: 'Attendance entry not found' });

    attendanceEntry.endTime = new Date();
    await attendanceEntry.save();
    res.status(200).json(attendanceEntry);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

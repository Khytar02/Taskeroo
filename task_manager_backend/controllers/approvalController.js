const Approval = require('../models/Approval');

// Approve a project or task
exports.approve = async (req, res) => {
  const { projectId, taskId } = req.body;
  const status = 'approved';

  try {
    const approval = await Approval.create({ projectId, taskId, status });
    res.status(201).json(approval);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Reject a project or task
exports.reject = async (req, res) => {
  const { projectId, taskId } = req.body;
  const status = 'rejected';

  try {
    const approval = await Approval.create({ projectId, taskId, status });
    res.status(201).json(approval);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

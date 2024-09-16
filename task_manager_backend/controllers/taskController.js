const Task = require('../models/Task');

// Fetch all tasks for a project
exports.getTasks = async (req, res) => {
  const { projectId } = req.query; // Use query params instead of route params
  try {
    const tasks = await Task.findAll({ where: { projectId } });
    res.status(200).json(tasks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Create a task
exports.createTask = async (req, res) => {
  const { projectId, name, description } = req.body;
  try {
    const task = await Task.create({ projectId, name, description });
    res.status(201).json(task);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update a task
exports.updateTask = async (req, res) => {
  const { taskId } = req.params;
  const { name, description } = req.body;
  try {
    const task = await Task.findByPk(taskId);
    if (!task) return res.status(404).json({ error: 'Task not found' });

    task.name = name;
    task.description = description;
    await task.save();
    res.status(200).json(task);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

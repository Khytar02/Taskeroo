const Task = require('../models/Task');

exports.createTask = async (req, res) => {
  
  const { projectId, name, description, userId } = req.body;
  if (!projectId || !name) {
    return res.status(400).json({ error: 'Project ID and Task name are required.' });
  }

  try {
    const taskData = {
      projectId,
      name,
      description
    };

    // Only include userId if it's provided
    if (userId) {
      taskData.userId = userId;
    }

    const task = await Task.create(taskData);
    res.status(201).json(task);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Fetch all tasks for a project
exports.getTasks = async (req, res) => {
  const { projectId } = req.query;  // Extract projectId from query parameters

  try {
    let tasks;
    if (projectId) {
      tasks = await Task.findAll({
        where: { projectId }
      });
    } else {
      tasks = await Task.findAll(); // Return all tasks if no projectId is provided
    }
    res.status(200).json(tasks);
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

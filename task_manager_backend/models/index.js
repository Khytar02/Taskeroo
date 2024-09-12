// index.js

const express = require('express');
const sequelize = require('./config/database');
const projectRoutes = require('./routes/projectRoutes');
const taskRoutes = require('./routes/taskRoutes');
const approvalRoutes = require('./routes/approvalRoutes');
const timeTrackingRoutes = require('./routes/timeTrackingRoutes');

const app = express();
app.use(express.json());

// Set up routes
app.use('/api/projects', projectRoutes);
app.use('/api/tasks', taskRoutes);
app.use('/api/approvals', approvalRoutes);
app.use('/api/time-tracking', timeTrackingRoutes);

// Database sync and server start
sequelize.sync().then(() => {
  app.listen(5000, () => {
    console.log('Server is running on port 5000');
  });
});

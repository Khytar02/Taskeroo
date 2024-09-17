// Import necessary modules
const express = require('express');
const app = express();
const dotenv = require('dotenv');
const sequelize = require('./config/database'); // Import Sequelize instance
const User = require('./models/User'); // Import User model
const authRoutes = require('./routes/authRoutes'); // Import authentication routes
const clockRoutes = require('./routes/clockRoutes'); // Import clock routes
const projectRoutes = require('./routes/projectRoutes'); // Import project routes
const taskRoutes = require('./routes/taskRoutes'); // Import task routes
const timeTrackingRoutes = require('./routes/timeTrackingRoutes'); // Import the time tracking routes

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Logging middleware to capture the raw incoming request body


// Load environment variables from .env file
dotenv.config();

// Define a simple route to test the server
app.get('/', (req, res) => {
  res.send('API is running...');
});

// Use authentication routes
app.use('/api/auth', authRoutes);

// Register the project routes
app.use('/api/projects', projectRoutes);

// Register task routes
app.use('/api/tasks', taskRoutes);

app.use('/api/time-tracking', timeTrackingRoutes);

// Set the port from environment variable or default to 5000
const PORT = process.env.PORT || 5000;

// Sync the database and start the server
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}).catch(err => console.error('Failed to sync the database:', err));

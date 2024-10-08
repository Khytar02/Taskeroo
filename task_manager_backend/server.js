// Import necessary modules
const express = require('express');
const dotenv = require('dotenv');
const sequelize = require('./config/database'); // Import Sequelize instance
const User = require('./models/User'); // Import User model
const authRoutes = require('./routes/authRoutes'); // Import authentication routes

// Load environment variables from .env file
dotenv.config();

// Initialize the Express app
const app = express();

// Middleware to parse JSON requests
app.use(express.json());

// Define a simple route to test the server
app.get('/', (req, res) => {
  res.send('API is running...');
});

// Use authentication routes
app.use('/api/auth', authRoutes);

// Set the port from environment variable or default to 5000
const PORT = process.env.PORT || 5000;

// Sync the database and start the server
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}).catch(err => console.error('Failed to sync the database:', err));

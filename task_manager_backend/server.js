// Import necessary modules
const express = require('express');
const dotenv = require('dotenv');

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

// Set the port from environment variable or default to 5000
const PORT = process.env.PORT || 5000;

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

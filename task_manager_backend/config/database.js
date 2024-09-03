const { Sequelize } = require('sequelize');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

// Create a new Sequelize instance for PostgreSQL
const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
  logging: false, // Disable logging; default: console.log
});

// Test the database connection
sequelize.authenticate()
  .then(() => console.log('PostgreSQL connected successfully.'))
  .catch(err => console.error('Unable to connect to the database:', err));

// Export the sequelize instance to use in other parts of the app
module.exports = sequelize;

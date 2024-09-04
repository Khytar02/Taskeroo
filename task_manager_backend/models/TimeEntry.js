const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./User'); // Import User model to establish relationship

const TimeEntry = sequelize.define('TimeEntry', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: 'id'
    }
  },
  clockInTime: {
    type: DataTypes.DATE,
    allowNull: true, // Initially null until user clocks in
  },
  clockOutTime: {
    type: DataTypes.DATE,
    allowNull: true, // Initially null until user clocks out
  },
}, {
  timestamps: true // Automatically adds createdAt and updatedAt fields
});

module.exports = TimeEntry;

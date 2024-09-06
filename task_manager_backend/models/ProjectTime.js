const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const ProjectTime = sequelize.define('ProjectTime', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  timestamps: true, // Automatically includes createdAt and updatedAt fields
});

module.exports = ProjectTime;

const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Project = require('./Project');
const Task = require('./Task');
const User = require('./User');
const TimeEntry = sequelize.define('TimeEntry', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false, // Ensure userId is not nullable
    references: {
      model: 'Users', // Ensure it refers to the correct Users table
      key: 'id',
    },
    onDelete: 'CASCADE',
  },
  projectId: {
    type: DataTypes.INTEGER,
    allowNull: true, // Time can be tracked for a project or task
    references: {
      model: Project,
      key: 'id',
    },
    onDelete: 'CASCADE',
  },
  taskId: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: Task,
      key: 'id',
    },
    onDelete: 'CASCADE',
  },
  startTime: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  endTime: {
    type: DataTypes.DATE,
    allowNull: true, // If null, time tracking is still ongoing
  },
});

Project.hasMany(TimeEntry, { foreignKey: 'projectId' });
Task.hasMany(TimeEntry, { foreignKey: 'taskId' });

TimeEntry.belongsTo(Project, { foreignKey: 'projectId' });
TimeEntry.belongsTo(Task, { foreignKey: 'taskId' });

module.exports = TimeEntry;

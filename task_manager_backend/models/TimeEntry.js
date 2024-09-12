const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Project = require('./Project');
const Task = require('./Task');

const TimeEntry = sequelize.define('TimeEntry', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
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

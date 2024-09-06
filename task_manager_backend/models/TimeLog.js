const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const TaskTime = require('./TaskTime'); // Import the TaskTime model

const TimeLog = sequelize.define('TimeLog', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  taskId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: TaskTime,
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
    allowNull: true, // Will remain null until time tracking stops
  },
}, {
  timestamps: true,
});

// Set up the relationship between TaskTime and TimeLog
TaskTime.hasMany(TimeLog, { foreignKey: 'taskId' });
TimeLog.belongsTo(TaskTime);

module.exports = TimeLog;

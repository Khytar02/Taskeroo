// models/TimeLog.js

const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const TimeEntry = require('./TimeEntry');

const TimeLog = sequelize.define('TimeLog', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  timeEntryId: {
    type: DataTypes.INTEGER,
    references: {
      model: TimeEntry,
      key: 'id',
    },
    onDelete: 'CASCADE',
  },
  logDetails: {
    type: DataTypes.STRING,
    allowNull: true, // Details of the log entry, if necessary
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
});

TimeEntry.hasMany(TimeLog, { foreignKey: 'timeEntryId' });
TimeLog.belongsTo(TimeEntry, { foreignKey: 'timeEntryId' });

module.exports = TimeLog;

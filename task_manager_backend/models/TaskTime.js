const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const ProjectTime = require('./ProjectTime'); // Import the ProjectTime model

const TaskTime = sequelize.define('TaskTime', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  projectId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: ProjectTime,
      key: 'id'
    },
    onDelete: 'CASCADE',
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  timestamps: true,
});

// Set up the relationship between ProjectTime and TaskTime
ProjectTime.hasMany(TaskTime, { foreignKey: 'projectId' });
TaskTime.belongsTo(ProjectTime);

module.exports = TaskTime;

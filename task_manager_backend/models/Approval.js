const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Project = require('./Project');
const Task = require('./Task');

const Approval = sequelize.define('Approval', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  projectId: {
    type: DataTypes.INTEGER,
    allowNull: true, // Approval can be for a project or a task
    references: {
      model: Project,
      key: 'id',
    },
    onDelete: 'CASCADE',
  },
  taskId: {
    type: DataTypes.INTEGER,
    allowNull: true, // Approval can be for a task or project
    references: {
      model: Task,
      key: 'id',
    },
    onDelete: 'CASCADE',
  },
  status: {
    type: DataTypes.STRING, // 'pending', 'approved', 'rejected'
    allowNull: false,
  },
  comments: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
});

Project.hasMany(Approval, { foreignKey: 'projectId' });
Task.hasMany(Approval, { foreignKey: 'taskId' });

Approval.belongsTo(Project, { foreignKey: 'projectId' });
Approval.belongsTo(Task, { foreignKey: 'taskId' });

module.exports = Approval;

var DataTypes = require("sequelize").DataTypes;
var _ProjectTimes = require("./ProjectTimes");
var _Projects = require("./Projects");
var _SequelizeMeta = require("./SequelizeMeta");
var _TaskTimes = require("./TaskTimes");
var _Tasks = require("./Tasks");
var _TimeEntries = require("./TimeEntries");
var _TimeLogs = require("./TimeLogs");
var _Users = require("./Users");

function initModels(sequelize) {
  var ProjectTimes = _ProjectTimes(sequelize, DataTypes);
  var Projects = _Projects(sequelize, DataTypes);
  var SequelizeMeta = _SequelizeMeta(sequelize, DataTypes);
  var TaskTimes = _TaskTimes(sequelize, DataTypes);
  var Tasks = _Tasks(sequelize, DataTypes);
  var TimeEntries = _TimeEntries(sequelize, DataTypes);
  var TimeLogs = _TimeLogs(sequelize, DataTypes);
  var Users = _Users(sequelize, DataTypes);

  TaskTimes.belongsTo(ProjectTimes, { as: "project", foreignKey: "projectId"});
  ProjectTimes.hasMany(TaskTimes, { as: "TaskTimes", foreignKey: "projectId"});
  Tasks.belongsTo(Projects, { as: "project", foreignKey: "projectId"});
  Projects.hasMany(Tasks, { as: "Tasks", foreignKey: "projectId"});
  TimeLogs.belongsTo(TaskTimes, { as: "task", foreignKey: "taskId"});
  TaskTimes.hasMany(TimeLogs, { as: "TimeLogs", foreignKey: "taskId"});
  Tasks.belongsTo(Users, { as: "user", foreignKey: "userId"});
  Users.hasMany(Tasks, { as: "Tasks", foreignKey: "userId"});
  TimeEntries.belongsTo(Users, { as: "user", foreignKey: "userId"});
  Users.hasMany(TimeEntries, { as: "TimeEntries", foreignKey: "userId"});

  return {
    ProjectTimes,
    Projects,
    SequelizeMeta,
    TaskTimes,
    Tasks,
    TimeEntries,
    TimeLogs,
    Users,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;

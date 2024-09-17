const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('TimeEntries', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'id'
      }
    },
    clockInTime: {
      type: DataTypes.DATE,
      allowNull: true
    },
    clockOutTime: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'TimeEntries',
    schema: 'public',
    timestamps: true,
    indexes: [
      {
        name: "TimeEntries_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};

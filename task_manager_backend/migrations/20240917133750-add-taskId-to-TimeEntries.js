'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('TimeEntries', 'taskId', {
      type: Sequelize.INTEGER,
      allowNull: true,  // Set to true if taskId is optional, otherwise false
      references: {
        model: 'Tasks',  // Make sure the name of the task table is correct
        key: 'id',
      },
      onDelete: 'CASCADE',  // This ensures that if a task is deleted, the time entries associated with it are deleted as well
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('TimeEntries', 'taskId');
  }
};

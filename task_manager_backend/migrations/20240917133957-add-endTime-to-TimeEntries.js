'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('TimeEntries', 'endTime', {
      type: Sequelize.DATE,
      allowNull: true, // This allows it to be null until time tracking is stopped
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('TimeEntries', 'endTime');
  }
};

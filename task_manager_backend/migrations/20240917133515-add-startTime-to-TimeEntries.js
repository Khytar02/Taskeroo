'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('TimeEntries', 'startTime', {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.NOW, // You can set this or remove it if not required
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('TimeEntries', 'startTime');
  }
};

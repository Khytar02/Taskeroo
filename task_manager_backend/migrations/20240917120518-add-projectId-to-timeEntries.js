'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('timeEntries', 'projectId', {
      type: Sequelize.INTEGER,
      references: {
        model: 'Projects', // Make sure this is the correct name of your project table
        key: 'id'
      },
      onDelete: 'CASCADE',
      allowNull: true // or false, depending on your needs
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('timeEntries', 'projectId');
  }
};

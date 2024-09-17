'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Tasks', 'userId', {
      type: Sequelize.INTEGER,
      allowNull: true,  // Allow userId to be optional
      references: {
        model: 'Users',  // Refers to the Users table
        key: 'id',
      },
      onDelete: 'SET NULL',  // If the user is deleted, set userId to null
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Tasks', 'userId');
  }
};
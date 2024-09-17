'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Tasks', 'userId', {
      type: Sequelize.INTEGER,
      allowNull: true, // Ensure userId is not nullable
      references: {
        model: 'Users',
        key: 'id',
      },
      onDelete: 'SET NULL',
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Tasks', 'userId');
  }
};

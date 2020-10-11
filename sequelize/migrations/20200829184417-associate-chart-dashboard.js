'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn(
      'charts', // name of Source model
      'dashboard_id', // name of the key we're adding 
      {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'dashboards',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      }
    );
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn(
      'charts',
      'dashboard_id'
    );
  }
};


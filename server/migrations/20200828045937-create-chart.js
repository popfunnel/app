'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('charts', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      created_by: {
        type: Sequelize.INTEGER
      },
      updated_by: {
        type: Sequelize.INTEGER
      },
      owned_by: {
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      customer_id: {
        type: Sequelize.INTEGER
      },
      dashboard_id: {
        type: Sequelize.INTEGER
      },
      config: {
        type: Sequelize.JSON
      },
      configured_results: {
        type: Sequelize.ARRAY(Sequelize.JSON)
      },
      raw_results: {
        type: Sequelize.ARRAY(Sequelize.JSON)
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      deleted_at: {
        allowNull: true,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('charts');
  }
};
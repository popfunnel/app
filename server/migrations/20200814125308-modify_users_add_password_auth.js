'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    return Promise.all([
      queryInterface.addColumn(
        'users',
        'last_login_at',
        {
          type: Sequelize.DATE,
          allowNull: true,
        },
      ),  
      queryInterface.addColumn(
        'users',
        'password_hash',
        {
          type: Sequelize.STRING,
          allowNull: true,
        },
      ),
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    return Promise.all([
      await queryInterface.removeColumn(
        'users',
        'last_login_at',
      ),
      await queryInterface.removeColumn(
        'users',
        'password_hash',
      ),
    ]);
  }
};

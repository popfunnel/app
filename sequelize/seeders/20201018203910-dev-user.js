'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('users', [{
      email: 'root',
      name: 'Poppa Funnelcakes',
      password_hash: '$2b$10$HjHpblMF9rBHG2ML/zoydOsA8WMVa3Ct6jeUK9k.NqUsRVwp/JRs2',
      created_at: new Date(),
      updated_at: new Date()
    }]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('users', null, {});
  }
};

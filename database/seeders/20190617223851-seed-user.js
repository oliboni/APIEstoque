'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('Users', [{
        name: 'Administrador',
        login: 'admin',
        password: '$2b$10$UmWlJflPpiuaJ3uRE9DV1ejmPucREO5NjWaiqe6aV7gjj.jRqSLVC',
        createdAt: '2019-01-01',
        updatedAt: '2019-01-01'
      }])

  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
    return queryInterface.bulkDelete('Users', null, {})
  }
};

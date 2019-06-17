'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Providers', {
      id: {
        allowNull: false,
        autoIncrement: true,
        type: Sequelize.INTEGER
      },
      cnpj: {
        allowNull: false,
        type: Sequelize.STRING
      },
      idAddress: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references:{
          model: 'Addresses',
          key: 'idAddress'
        }
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING
      },
      phone: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Providers');
  }
};

'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Inputs', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      idProduct: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Products',
          key:'id'
        }
      },
      idProvider: {
        allowNull: false,
        type: Sequelize.INTEGER,
        preferences:{
          model: 'Providers',
          key:'id'
        }
      },
      date: {
        type: Sequelize.DATE
      },
      amount: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      unitPrice: {
        allowNull: false,
        type: Sequelize.FLOAT
      },
      totalPrice: {
        allowNull: false,
        type: Sequelize.FLOAT
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
    return queryInterface.dropTable('Inputs');
  }
};
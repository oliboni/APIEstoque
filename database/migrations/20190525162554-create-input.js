'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Inputs', {
      id: {
        allowNull: false,
        autoIncrement: true,
        type: Sequelize.INTEGER
      },
      idInput: {
        allowNull: false,
        primaryKey: true,
        unique:true,
        type: Sequelize.INTEGER
      },
      idProduct: {
        allowNull:false,
        type: Sequelize.INTEGER
      },
      idProvider: {
        allowNull:false,
        unique:true,
        type: Sequelize.INTEGER
      },
      date: {
        allowNull:false,
        type: Sequelize.DATE
      },
      amount: {
        allowNull:false,
        type: Sequelize.INTEGER
      },
      unitPrice: {
        allowNull:false,
        type: Sequelize.FLOAT
      },
      totalPrice: {
        allowNull:false,
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

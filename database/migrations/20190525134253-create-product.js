'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Products', {
      id: {
        allowNull: false,
        autoIncrement: true,
        type: Sequelize.INTEGER
      },
      idProduct: {
        allowNull: false,
        primaryKey:true,
        unique:true,
        type: Sequelize.INTEGER
      },
      idCategory: {
        allowNull: false,
        type: Sequelize.INTEGER,
        unique:true,
        references: {
          model: 'Categories',
          key: 'idCategory'
        }
      },
      unitPrice: {
        allowNull: false,
        type: Sequelize.FLOAT
      },
      name: {
        allowNull: false,
        unique:true,
        type: Sequelize.STRING
      },
      amount: {
        allowNull: false,
        type: Sequelize.INTEGER
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
    return queryInterface.dropTable('Products');
  }
};

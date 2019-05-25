'use strict';
module.exports = (sequelize, DataTypes) => {
  const Input = sequelize.define('Input', {
    idInput: DataTypes.INTEGER,
    idProduct: DataTypes.INTEGER,
    idProvider: DataTypes.INTEGER,
    date: DataTypes.DATE,
    amount: DataTypes.INTEGER,
    unitPrice: DataTypes.FLOAT,
    totalPrice: DataTypes.FLOAT
  }, {});
  Input.associate = function(models) {
    Input.belongsTo(models.Product, {foreignKey: 'idProduct'})
    Input.belongsTo(models.Provider, {foreignKey: 'idProvider'})
  };
  return Input;
};

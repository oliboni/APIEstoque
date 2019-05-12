'use strict';
module.exports = (sequelize, DataTypes) => {
  const Output = sequelize.define('Output', {
    idProduct: DataTypes.INTEGER,
    amount: DataTypes.INTEGER,
    unitPrice: DataTypes.FLOAT,
    totalPrice: DataTypes.FLOAT
  }, {});
  Output.associate = function(models) {
    Output.belongsTo(models.Product, {foreignKey: 'idProduct'})
  };
  return Output;
};
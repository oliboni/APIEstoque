'use strict';
module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define('Product', {
    idCategory: DataTypes.INTEGER,
    idProvider: DataTypes.INTEGER,
    name: DataTypes.STRING,
    unitPrice: DataTypes.FLOAT,
    amount: DataTypes.INTEGER
  }, {})
  Product.associate = function(models) {
    Product.belongsTo(models.Category, {foreignKey: 'idCategory'})
    Product.belongsTo(models.Provider,{foreignKey: 'idProvider'})
  }
  return Product;
}
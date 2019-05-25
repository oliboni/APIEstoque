'use strict';
module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define('Product', {
    idProduct: DataTypes.INTEGER,
    idCategory: DataTypes.INTEGER,
    unitPrice: DataTypes.FLOAT,
    name: DataTypes.STRING,
    amount: DataTypes.INTEGER
  }, {});
  Product.associate = function(models) {
    Product.belongsTo(models.Category, {foreignKey:'idCategory'})
  };
  return Product;
};

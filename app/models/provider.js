'use strict';
module.exports = (sequelize, DataTypes) => {
  const Provider = sequelize.define('Provider', {
    idProvider: DataTypes.INTEGER,
    cnpj: DataTypes.STRING,
    idAddress: DataTypes.INTEGER,
    name: DataTypes.STRING,
    phone: DataTypes.STRING
  }, {});
  Provider.associate = function(models) {
    Provider.hasMany(models.Address, {foreignKey: 'idAddress'})
  };
  return Provider;
};

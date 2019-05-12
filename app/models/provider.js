'use strict';
module.exports = (sequelize, DataTypes) => {
  const Provider = sequelize.define('Provider', {
    cnpj: DataTypes.STRING,
    name: DataTypes.STRING,
    phone: DataTypes.STRING,
    idAddress: DataTypes.INTEGER
  }, {});
  Provider.associate = function(models) {
    Provider.belongsTo(models.Address, {foreignKey: 'idAddress'})
  };
  return Provider;
};
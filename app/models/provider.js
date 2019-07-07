'use strict';
module.exports = (sequelize, DataTypes) => {
  const Provider = sequelize.define('Provider', {
    cnpj: DataTypes.STRING,
    idAddress: DataTypes.INTEGER,
    name: DataTypes.STRING,
    phone: DataTypes.STRING
  }, {});
  Provider.associate = function(models) {
    Provider.belongsTo(models.Address, {foreignKey: 'idAddress'})
  };
  return Provider;
};

'use strict';
module.exports = (sequelize, DataTypes) => {
  const Provider = sequelize.define('Provider', {
    cnpj: DataTypes.STRING,
    name: DataTypes.STRING,
    phone: DataTypes.STRING
  }, {});
  Provider.associate = function(models) {

  };
  return Provider;
};

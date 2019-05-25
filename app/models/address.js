'use strict';
module.exports = (sequelize, DataTypes) => {
  const Address = sequelize.define('Address', {
    idAddress: DataTypes.INTEGER,
    street: DataTypes.STRING,
    number: DataTypes.INTEGER,
    state: DataTypes.STRING,
    city: DataTypes.STRING
  }, {});
  Address.associate = function(models) {
    // associations can be defined here
  };
  return Address;
};

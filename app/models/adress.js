'use strict';
module.exports = (sequelize, DataTypes) => {
  const Adress = sequelize.define('Adress', {
    state: DataTypes.STRING,
    city: DataTypes.STRING,
    street: DataTypes.STRING,
    number: DataTypes.INTEGER
  }, {});
  Adress.associate = function(models) {
    // associations can be defined here
  };
  return Adress;
};
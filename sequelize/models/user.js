'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    static associate({customer, chart}) {
      user.belongsTo(customer);
      user.hasMany(chart);
    };
  };
  user.init({
    email: DataTypes.STRING,
    name: DataTypes.STRING
  }, {
    sequelize,
    underscored: true,
    paranoid: true,
  });

  return user;
};
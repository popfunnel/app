'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    static associate(models) {
      console.log("enter user")
      user.belongsTo(models.customer);
      // define association here
    }
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
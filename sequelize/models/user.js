'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    static associate(models) {
      // TODO: associate with a 'roles' model
    };
  };
  user.init({
    email: DataTypes.STRING,
    name: DataTypes.STRING,
    password_hash: DataTypes.STRING
  }, {
    sequelize,
    underscored: true,
    paranoid: true,
  });

  return user;
};
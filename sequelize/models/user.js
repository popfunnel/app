'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    static associate({role, user_role}) {
      user.belongsToMany(role, { through: user_role });
    };
  };
  user.init({
    email: DataTypes.STRING,
    name: DataTypes.STRING,
    passwordHash: DataTypes.STRING
  }, {
    sequelize,
    underscored: true,
    paranoid: true,
  });

  return user;
};
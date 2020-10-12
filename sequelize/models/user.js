'use strict';
const { Model } = require('sequelize');

const bcrypt = require('bcrypt');

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
    hooks: {
      beforeCreate: async (user, options) => {
        user.passwordHash = await bcrypt.hash(user.passwordHash, 10);
      }
    },
  });

  return user;
};
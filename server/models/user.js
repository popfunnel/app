'use strict';

const jwt = require('jsonwebtoken');

const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  user.init({
    email: DataTypes.STRING,
    passwordHash: DataTypes.STRING,
    lastLoginAt: DataTypes.DATE,
  }, {
    sequelize,
    underscored: true,
    paranoid: true,
    hooks: {
      beforeCreate: async function(user) {
        const salt = await bcrypt.genSalt(10);
        user.passwordHash = await bcrypt.hash(user.passwordHash, salt);
        user.lastLoginAt = sequelize.fn('NOW')
    }
    },
    instanceMethods: {
      validPassword: async function(password) {
        return await bcrypt.compareSync(password, this.passwordHash);
      }
    },    
  });

  return user;
};
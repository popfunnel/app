'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class user_role extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({customer, role, user}) {
      user_role.belongsTo(customer);
    }
  };
  user_role.init({
    customer_id: DataTypes.TEXT,
    role_id: DataTypes.TEXT,
    user_id: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'user_role',
    underscored: true,
    paranoid: true
  });
  return user_role;
};
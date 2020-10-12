'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class role extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({customer, user, user_role}) {
      role.belongsTo(customer);
      role.belongsToMany(user, { through: user_role });
    }
  };
  role.init({
    customer_id: DataTypes.TEXT,
    name: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'role',
    underscored: true,
    paranoid: true
  });
  return role;
};
'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class database extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(customer) {
      // define association here
      database.belongsTo(customer);
    };
  };
  database.init({
    host: DataTypes.TEXT,
    port: DataTypes.INTEGER,
    username: DataTypes.TEXT,
    password: DataTypes.TEXT,
    database_type: DataTypes.TEXT,
    name: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'database',
    underscored: true,
    paranoid: true
  });
  return database;
};
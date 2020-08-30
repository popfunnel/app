'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class database extends Model {
    static associate(customer) {
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
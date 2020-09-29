'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class customer extends Model {
    static associate({chart, dashboard, database}) {
      // Default behavior for ondelete is 'onDelete: SET NULL | NO ACTION'
      // TODO: functional test to test behavior using seeds, but pretty sure nothing will happen'
      customer.hasMany(chart);
      customer.hasMany(dashboard);
      customer.hasMany(database);
    }
  };
  customer.init({
    name: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'customer',
    underscored: true,
    paranoid: true
  });
  return customer;
};

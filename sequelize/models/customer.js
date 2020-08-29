'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class customer extends Model {
    static associate({user}) {
      // Default behavior for ondelete is 'onDelete: SET NULL | NO ACTION'
      // TODO: functional test to test behavior using seeds, but pretty sure nothing will happen'
      // customer.hasMany(chart);
    }
  };
  customer.init({
    name: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'customer',
    paranoid: true
  });
  return customer;
};

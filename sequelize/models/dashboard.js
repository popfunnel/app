'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class dashboard extends Model {
    static associate({chart, customer}) {
      dashboard.hasMany(chart);
      dashboard.belongsTo(customer);
    }
  };
  dashboard.init({
    created_by: DataTypes.INTEGER,
    updated_by: DataTypes.INTEGER,
    owned_by: DataTypes.INTEGER,
    name: DataTypes.STRING,
    chart_layout: DataTypes.JSON,
    customer_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'dashboard',
    underscored: true,
    paranoid: true
  });
  return dashboard;
};
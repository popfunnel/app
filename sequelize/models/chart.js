'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {

  class chart extends Model {
    static associate({user, dashboard, customer}) {
      // chart.belongsTo(user);
      chart.belongsTo(dashboard);
      // chart.belongsTo(customer);
    }
  };

  chart.init({
    created_by: DataTypes.INTEGER,
    updated_by: DataTypes.INTEGER,
    owned_by: DataTypes.INTEGER,
    name: DataTypes.STRING,
    config: DataTypes.JSON,
    configured_results: DataTypes.ARRAY(DataTypes.JSON),
    raw_results: DataTypes.ARRAY(DataTypes.JSON)
  }, {
    sequelize,
    modelName: 'chart',
    underscored: true,
    paranoid: true
  });

  return chart;
};
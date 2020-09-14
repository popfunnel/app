'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {

  class chart extends Model {
    static associate({dashboard, customer}) {
      chart.belongsTo(dashboard);
      chart.belongsTo(customer);
    };
  };

  chart.init({
    created_by: DataTypes.INTEGER,
    updated_by: DataTypes.INTEGER,
    owned_by: DataTypes.INTEGER,
    name: DataTypes.STRING,
    type: DataTypes.STRING,
    config: DataTypes.JSON,
    raw_query: DataTypes.TEXT,
    raw_results: DataTypes.JSON,
    dashboard_id: DataTypes.INTEGER,
    customer_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'chart',
    underscored: true,
    paranoid: true
  });

  return chart;
};
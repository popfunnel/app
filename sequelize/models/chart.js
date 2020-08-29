'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class chart extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  chart.init({
    created_by: DataTypes.INTEGER,
    updated_by: DataTypes.INTEGER,
    owned_by: DataTypes.INTEGER,
    name: DataTypes.STRING,
    customer_id: DataTypes.INTEGER,
    dashboard_id: DataTypes.INTEGER,
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
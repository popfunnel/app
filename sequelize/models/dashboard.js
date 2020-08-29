'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class dashboard extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({user, customer}) {
      dashboard.hasMany(chart);
      
      // dashboard.belongsTo(user);
      // dashboard.belongsTo(customer);


    }
  };
  dashboard.init({
    created_by: DataTypes.INTEGER,
    updated_by: DataTypes.INTEGER,
    owned_by: DataTypes.INTEGER,
    name: DataTypes.STRING,
    charts: DataTypes.ARRAY(DataTypes.INTEGER)
  }, {
    sequelize,
    modelName: 'dashboard',
    underscored: true,
    paranoid: true
  });
  return dashboard;
};
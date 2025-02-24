'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Point extends Model {
   
    static associate({Route}) {
      this.belongsTo(Route, {
        foreignKey: 'route_id',
        as: 'route',
        onDelete: "CASCADE"
      });
    }
  }
  Point.init({
    route_id: DataTypes.INTEGER,
    description: DataTypes.STRING,
    latitude: DataTypes.FLOAT,
    longitude: DataTypes.FLOAT
  }, {
    sequelize,
    modelName: 'Point',
  });
  return Point;
};
'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Photo extends Model {
    static associate({ Route }) {
      this.belongsTo(Route, { foreignKey: 'route_id' });
    }
  }
  Photo.init(
    {
      url: DataTypes.STRING,
      route_id: DataTypes.NUMBER,
    },
    {
      sequelize,
      modelName: 'Photo',
    },
  );
  return Photo;
};

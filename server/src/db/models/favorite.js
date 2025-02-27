'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Favorite extends Model {
    static associate({ User, Route }) {
      this.belongsTo(User, { foreignKey: 'user_id', as: 'user' });
      this.belongsTo(Route, { foreignKey: 'route_id', as: 'route' });
    }
  }
  Favorite.init({
    user_id: DataTypes.INTEGER,
    route_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Favorite',
  });
  return Favorite;
};
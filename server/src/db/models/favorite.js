'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Favorite extends Model {
    static associate({ User, Route }) {
      this.belongsTo(User, { foreignKey: 'user_id', as: 'userFav' });
      this.belongsTo(Route, { foreignKey: 'route_id', as: 'routeFav' });
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
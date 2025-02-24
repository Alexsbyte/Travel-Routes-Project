'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    static associate({ User, Route }) {
      this.belongsTo(User, { foreignKey: 'user_id', as: 'userComment' });
      this.belongsTo(Route, { foreignKey: 'route_id', as: 'routeComment' });
    }
  }
  Comment.init(
    {
      text: DataTypes.STRING,
      user_id: DataTypes.INTEGER,
      route_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'Comment',
    },
  );
  return Comment;
};

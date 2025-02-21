'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
    }
  }
  User.init({
    username: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    isAdmin: DataTypes.BOOLEAN,
  }, {
    sequelize,
    modelName: 'User',
  });

  User.associate = function (models) {
    User.hasMany(models.Route, {
      foreignKey: 'user_id',
      as: 'routes',
    });
  };


  return User;
};
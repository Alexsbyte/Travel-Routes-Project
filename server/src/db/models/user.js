'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate({ Route, Comment }) {
      this.hasMany(Route, { foreignKey: 'user_id' });
      this.hasMany(Comment, { foreignKey: 'user_id', as: 'comments' });
    }
  }
  User.init(
    {
      username: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      isAdmin: DataTypes.BOOLEAN,
      isVerified: DataTypes.BOOLEAN,
      resetTokenExpiry: DataTypes.DATE,
      verificationToken: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      avatar: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: 'User',
    },
  );
  return User;
};

module.exports = (sequelize, DataTypes) => {
  const Route = sequelize.define('Route', {
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    category: {
      type: DataTypes.ENUM('автомобильный', 'пеший', 'велосипедный'),
      allowNull: false
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  });
  Route.associate = function (models) {
    Route.belongsTo(models.User, {
      foreignKey: 'user_id',
      as: 'user',
    });
  };

  return Route;
};

const { Route, User, Photo, Point, Favorite } = require('../db/models');

class RouteService {
  static async create(data) {
    return await Route.create(data);
  }

  static async getAll() {
    return await Route.findAll({
      include: [
        {
          model: User,
          as: 'user',
          attributes: ['id', 'username', 'email'],
        },
        {
          model: Photo,
          as: 'photos',
          attributes: ['id', 'url'],
        },
        {
          model: Point,
          as: 'points',
          attributes: ['id', 'description', 'latitude', 'longitude'],
        },
        {
          model: Favorite,
          as: 'favorite',
          attributes: ['id','user_id'],
        },
      ],
    });
  }

  static async getById(id) {
    return await Route.findByPk(id, {
      include: [
        {
          model: User,
          as: 'user',
          attributes: ['id', 'username', 'email'],
        },
        {
          model: Photo,
          as: 'photos',
          attributes: ['id', 'url'],
        },
        {
          model: Point,
          as: 'points',
          attributes: ['id', 'description', 'latitude', 'longitude'],
        },
      ],
    });
  }

  static async update(id, data) {
    const route = await Route.findByPk(id);
    if (route) {
      return await route.update(data);
    }
    throw new Error('Route not found');
  }

  static async delete(id) {
    const route = await Route.findByPk(id);
    if (route) {
      return await route.destroy();
    }
    throw new Error('Route not found');
  }

  static async getRoutesByUser(userId) {
    return await Route.findAll({ where: { user_id: userId } });
  }
}

module.exports = RouteService;

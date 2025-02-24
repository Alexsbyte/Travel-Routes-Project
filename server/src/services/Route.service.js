const { Route, User, Photo, Point } = require('../db/models');

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
          attributes: ['username', 'email'],
        },
        {
          model: Photo,
          as: 'photos',
          attributes: ['url'],
        },
        {
          model: Point,
          as: 'points',
          attributes: ['description', 'latitude', 'longitude'],
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
          attributes: ['username', 'email'],
        },
        {
          model: Photo,
          as: 'photos',
          attributes: ['url'],
        },
        {
          model: Point,
          as: 'points',
          attributes: ['description', 'latitude', 'longitude'],
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

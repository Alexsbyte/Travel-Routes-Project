const { Favorite, Route, Photo } = require('../db/models');

class FavoriteService {
  static async getById(id) {
    return await Favorite.findByPk(id);
  }

  static async getAllFavorites(user_id) {
    return await Favorite.findAll({
      where: { user_id },
      include: [
        {
          model: Route,
          as: 'route',
          include: [
            {
              model: Photo,
              as: 'photos',
              attributes: ['id', 'url'],
            },
          ],
        },
      ],
    });
  }

  static async getByRouteId(user_id, route_id) {
    return await Favorite.findOne({ where: { user_id, route_id } });
  }

  static async createFavorite(user_id, route_id) {
    const existingFavorite = await this.getByRouteId(user_id, route_id); // есть ли уже лайк?
    if (existingFavorite) return null;

    return await Favorite.create({ user_id, route_id });
  }

  static async deleteFavorite(user_id, route_id) {
    const favorite = await this.getByRouteId(user_id, route_id);
    if (favorite) {
      await favorite.destroy();
    }
    return favorite;
  }
}
module.exports = FavoriteService;

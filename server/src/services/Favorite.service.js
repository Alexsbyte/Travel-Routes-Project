const { Favorite, Route } = require('../db/models');

class FavoriteService {
  static async getById(id) {
    return await Favorite.findByPk(id);
  }

  static async getAllFavorites(user_id) {
    return await Favorite.findAll({
      where: { user_id },
      include: [{ model: Route, as: 'routeFav' }],
    });
  }

  static async getByRouteId(user_id, route_id) {
    return await Favorite.findOne({ where: { user_id, route_id } });
  }

  static async createFavorite(user_id, route_id) {
    const newFavorite = await Favorite.create({ user_id, route_id });
    return newFavorite;
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

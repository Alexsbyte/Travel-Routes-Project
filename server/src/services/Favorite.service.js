
const { Favorite, Route, Photo, User, Point  } = require('../db/models');

class FavoriteService {
  static async getById(id) {
    return await Favorite.findByPk(id);
  }

  static async getAllFavorites(user_id) {
    // Найти все избранные маршруты для пользователя
  const favorites = await Favorite.findAll({
    where: { user_id },
    attributes: ['route_id'], // Берем только id маршрутов
  });

  // Извлекаем route_id из массива объектов
  const routeIds = favorites.map(fav => fav.route_id);

  // Если нет избранных маршрутов, возвращаем пустой массив
  if (!routeIds.length) return [];

  // Находим маршруты по id из избранных
  return await Route.findAll({
    where: { id: routeIds }, // Фильтруем маршруты
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
        where: { user_id }, 
      required: false, 
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

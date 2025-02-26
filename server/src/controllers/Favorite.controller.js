const FavoriteService = require('../services/Favorite.service');
const formatResponse = require('../utils/formatResponse');

class FavoriteController {
  static async getOneRouteFavorite(req, res) {
    try {
      const { user } = res.locals;
      const user_id = user.id;
      const { route_id } = req.params;
      const favorite = await FavoriteService.getByRouteId(user_id, route_id);
      if (!favorite) {
        return res.status(200).json(formatResponse(200, 'success', null));
      }
      return res.status(200).json(formatResponse(200, 'success', favorite));
    } catch ({ message }) {
      console.error(message);
      res.status(500).json(formatResponse(500, 'Internal server error', null, message));
    }
  }

  static async getAllFavorites(req, res) {
    try {
      const { user } = res.locals;
      const user_id = user.id;
      const favorites = await FavoriteService.getAllFavorites(user_id);
      return res.status(200).json(formatResponse(200, 'success', favorites));
    } catch ({ message }) {
      console.error(message);
      res.status(500).json(formatResponse(500, 'Internal server error', null, message));
    }
  }

  static async createFavorite(req, res) {
    try {
      const { user } = res.locals;
      const user_id = user.id;
      const { route_id } = req.body;
      const favorite = await FavoriteService.createFavorite(user_id, route_id);
      return res.status(201).json(formatResponse(201, 'success', favorite));
    } catch ({ message }) {
      console.error(message);
      res.status(500).json(formatResponse(500, 'Internal server error', null, message));
    }
  }

  static async deleteFavorite(req, res) {
    try {
      const { user } = res.locals;
      const user_id = user.id;
      const { route_id } = req.params;
      const favorite = await FavoriteService.getByRouteId(user_id, route_id);

      if (!favorite) {
        return res
          .status(404)
          .json(
            formatResponse(404, 'Избранное не найдено', null, 'Избранное не найдено'),
          );
      }
      if (favorite.user_id !== user.id) {
        return res
          .status(400)
          .json(
            formatResponse(
              400,
              'Отсутствуют права для удаления',
              null,
              'Отсутствуют права для удаления',
            ),
          );
      }
      const deleteFavorite = await FavoriteService.deleteFavorite(user_id, route_id);
      res
        .status(200)
        .json(formatResponse(200, 'Избранное успешно удалено', deleteFavorite));
    } catch ({ message }) {
      console.error(message);
      res.status(500).json(formatResponse(500, 'Internal server error', null, message));
    }
  }
}

module.exports = FavoriteController;

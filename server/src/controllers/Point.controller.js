const PointService = require('../services/Point.service')
const RouteService = require('../services/Route.service'); // Проверка маршрута
const formatResponse = require('../utils/formatResponse');
const colors = require('ansi-colors');

class PointController {
  static async create(req, res) {
    const { route_id, description, latitude, longitude } = req.body;
    const { user } = res.locals;

    try {
      // Проверяем, существует ли маршрут
      const route = await RouteService.getById(route_id);
      if (!route) {
        return res.status(404).json(formatResponse(404, 'Route not found'));
      }

      // Проверяем, является ли пользователь владельцем маршрута
      if (route.user_id !== user.id) {
        return res.status(403).json(formatResponse(403, 'No rights', null, 'No rights'));
      }

      const newPoint = await PointService.create({
        route_id,
        description,
        latitude,
        longitude,
      });

      if (!newPoint) {
        return res.status(400).json(formatResponse(400, 'Failed to create point'));
      }

      console.log(colors.bgGreen('Point created successfully'));
      res.status(201).json(formatResponse(201, 'Point created successfully', newPoint));
    } catch (error) {
      res.status(500).json(formatResponse(500, 'Internal server error', null, error.message));
    }
  }

  static async getAll(req, res) {
    try {
      const points = await PointService.getAll();
      if (points.length === 0) {
        console.log(colors.bgMagenta('No points found'));
        return res.status(204).json(formatResponse(204, 'No points found', []));
      }
      console.log(colors.bgMagenta('Points retrieved successfully'));
      res.status(200).json(formatResponse(200, 'Points retrieved successfully', points));
    } catch (error) {
      res.status(500).json(formatResponse(500, 'Internal server error', null, error.message));
    }
  }

  static async getById(req, res) {
    try {
      const { id } = req.params;
      const point = await PointService.getById(id);
      if (!point) {
        return res.status(404).json(formatResponse(404, 'Point not found', null));
      }
      res.status(200).json(formatResponse(200, 'Point retrieved successfully', point));
    } catch (error) {
      res.status(500).json(formatResponse(500, 'Internal server error', null, error.message));
    }
  }

  static async update(req, res) {
    const { id } = req.params;
    const { user } = res.locals;
    const { description, latitude, longitude } = req.body;

    if (!req.body) {
      console.log(colors.yellow('Bad request: No data provided'));
      return res.status(400).json(formatResponse(400, 'Bad request: No data provided'));
    }

    try {
      const point = await PointService.getById(id);
      if (!point) {
        return res.status(404).json(formatResponse(404, 'Point not found', null));
      }

      // Проверяем, принадлежит ли точка маршруту пользователя
      const route = await RouteService.getById(point.route_id);
      if (route.user_id !== user.id) {
        return res.status(403).json(formatResponse(403, 'No rights', null, 'No rights'));
      }
      const updatedPoint = await PointService.update(id, { description, latitude, longitude });

      if (!updatedPoint) {
        return res.status(400).json(formatResponse(400, 'Failed to update point'));
      }

      console.log(colors.bgYellowBright('Point updated successfully'));
      res.status(200).json(formatResponse(200, 'Point updated successfully', updatedPoint));
    } catch (error) {
      res.status(500).json(formatResponse(500, 'Internal server error', null, error.message));
    }
  }

  static async delete(req, res) {
    try {
      const { id } = req.params;
      const { user } = res.locals;

      const point = await PointService.getById(id);
      if (!point) {
        return res.status(404).json(formatResponse(404, 'Point not found', null));
      }

      // Проверяем, принадлежит ли точка маршруту пользователя
      const route = await RouteService.getById(point.route_id);
      if (route.user_id !== user.id) {
        return res.status(403).json(formatResponse(403, 'No rights', null, 'No rights'));
      }

      await PointService.delete(id);
      console.log(colors.bgRed('Point deleted successfully'));
      res.status(200).json(formatResponse(200, 'Point deleted', point));
    } catch (error) {
      res.status(500).json(formatResponse(500, 'Internal server error', null, error.message));
    }
  }
}

module.exports = PointController;

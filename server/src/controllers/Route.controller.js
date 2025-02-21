const RouteService = require('../services/Route.service');
const formatResponse = require('../utils/formatResponse');
const RouteValidator = require('../utils/Route.validator');
const colors = require('ansi-colors');

class RouteController {
  static async create(req, res) {
    const { title, description, category } = req.body;
    const { user } = res.locals;
    const { isValid, error } = RouteValidator.validateCreate({
      title,
      description,
      category,
    });

    if (!isValid) {
      return res.status(400).json(formatResponse(400, 'Validation error', null, error));
    }

    try {
      const newRoute = await RouteService.create({
        title,
        description,
        category,
        user_id: user.id,
      });

      if (!newRoute) {
        return res.status(400).json(formatResponse(400, 'Failed to create new route'));
      }

      const fullRoute = await RouteService.getById(newRoute.id);
      console.log(colors.bgGreen('Route created successfully'));

      res.status(201).json(formatResponse(201, 'Route created successfully', fullRoute));
    } catch ({ message }) {
      res.status(500).json(formatResponse(500, 'Internal server error', null, message));
    }
  }

  static async getAll(req, res) {
    try {
      const routes = await RouteService.getAll();
      if (routes.length === 0) {
        console.log(colors.bgMagenta('You have no routes'));
        res.status(200).json(formatResponse(204, 'You have no routes', []));
        return;
      }
      console.log(colors.bgMagenta('Routes retrieved successfully'));
      res.status(200).json(formatResponse(200, 'Routes retrieved successfully', routes));
    } catch (error) {
      res
        .status(500)
        .json(formatResponse(500, 'Internal server error', null, error.message));
    }
  }

  static async getById(req, res) {
    try {
      const { id } = req.params;
      const route = await RouteService.getById(id);
      if (!route) {
        return res.status(404).json(formatResponse(404, 'Route not found', null));
      }
      res.status(200).json(formatResponse(200, 'Route retrieved successfully', route));
    } catch (error) {
      res
        .status(500)
        .json(formatResponse(500, 'Internal server error', null, error.message));
    }
  }

  static async update(req, res) {
    const { id } = req.params;
    const { user } = res.locals;

    if (!req.body) {
      console.log(colors.yellow('Bad request: No data provided'));
      return res
        .status(400)
        .json(formatResponse(400, 'Bad request: No data provided', null));
    }

    const { title, description, category } = req.body;

    try {
      const currentRoute = await RouteService.getById(id);
      if (!currentRoute) {
        return res.status(404).json(formatResponse(404, 'Route not found', null));
      }

      if (currentRoute.user_id !== user.id) {
        return res.status(400).json(formatResponse(400, 'No rights', null, 'No rights'));
      } else {
        const { isValid, error } = RouteValidator.validateUpdate({
          title,
          description,
          category,
        });

        if (!isValid) {
          return res
            .status(400)
            .json(formatResponse(400, 'Validation error', null, error));
        }

        const updatedRoute = await RouteService.update(id, {
          title,
          description,
          category,
        });

        if (!updatedRoute) {
          return res.status(400).json(formatResponse(400, 'Failed to update route'));
        }
        console.log(colors.bgYellowBright('Route updated successfully'));
        res
          .status(200)
          .json(formatResponse(200, 'Route updated successfully', updatedRoute));
      }
    } catch ({ message }) {
      res.status(500).json(formatResponse(500, 'Internal server error', null, message));
    }
  }

  static async delete(req, res) {
    try {
      const { id } = req.params;
      const { user } = res.locals;
      const route = await RouteService.getById(id);

      if (!route) {
        return res.status(404).json(formatResponse(404, 'Route not found', null));
      }
      if (route.user_id === user.id) {
        await RouteService.delete(id);
        console.log(colors.bgRed('Route deleted successfully'));
        res.status(200).json(formatResponse(200, 'Route deleted', route));
      } else {
        res.status(400).json(formatResponse(400, 'No rights', null, 'No rights'));
      }
    } catch (error) {
      res
        .status(500)
        .json(formatResponse(500, 'Internal server error', null, error.message));
    }
  }
}

module.exports = RouteController;

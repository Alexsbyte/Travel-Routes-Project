const PhotoService = require('../services/Photo.service');
const formatResponse = require('../utils/formatResponse');
const PhotoValidator = require('../utils/Photo.validator');
const colors = require('ansi-colors');

class PhotoController {
  static async create(req, res) {
    const { url, route_id } = req.body;

    try {
      const newPhoto = await PhotoService.create({ url, route_id });

      if (!newPhoto) {
        return res.status(400).json(formatResponse(400, 'Failed to create photo'));
      }

      const fullPhoto = await PhotoService.getById(newPhoto.id);

      res.status(201).json(formatResponse(201, 'Photo created successfully', fullPhoto));
    } catch ({ message }) {
      res.status(500).json(formatResponse(500, 'Internal server error', null, message));
    }
  }

  static async getAll(req, res) {
    try {
      const photos = await PhotoService.getAll();
      if (photos.length === 0) {
        res.status(204).json(formatResponse(204, 'No photos found', []));
        return;
      }
      res.status(200).json(formatResponse(200, 'Photos retrieved successfully', photos));
    } catch (error) {
      res
        .status(500)
        .json(formatResponse(500, 'Internal server error', null, error.message));
    }
  }

  static async getById(req, res) {
    try {
      const { id } = req.params;
      const photo = await PhotoService.getById(id);
      if (!photo) {
        return res.status(404).json(formatResponse(404, 'Photo not found', null));
      }
      res.status(200).json(formatResponse(200, 'Photo retrieved successfully', photo));
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
      return res
        .status(400)
        .json(formatResponse(400, 'Bad request: No data provided', null));
    }

    const { url, route_id } = req.body;

    try {
      const currentPhoto = await PhotoService.getById(id);
      if (!currentPhoto) {
        return res.status(404).json(formatResponse(404, 'Photo not found', null));
      }

      if (currentPhoto.user_id !== user.id) {
        return res.status(403).json(formatResponse(403, 'No rights', null, 'No rights'));
      } else {
        const { isValid, error } = PhotoValidator.validateUpdate({ url, route_id });

        if (!isValid) {
          return res
            .status(400)
            .json(formatResponse(400, 'Validation error', null, error));
        }

        const updatedPhoto = await PhotoService.update(id, { url, route_id });

        if (!updatedPhoto) {
          return res.status(400).json(formatResponse(400, 'Failed to update photo'));
        }
        console.log(colors.bgYellowBright('Photo updated successfully'));
        res
          .status(200)
          .json(formatResponse(200, 'Photo updated successfully', updatedPhoto));
      }
    } catch ({ message }) {
      res.status(500).json(formatResponse(500, 'Internal server error', null, message));
    }
  }

  static async delete(req, res) {
    try {
      const { id } = req.params;
      const { user } = res.locals;
      const photo = await PhotoService.getById(id);

      if (!photo) {
        return res.status(404).json(formatResponse(404, 'Photo not found', null));
      }
      if (photo.user_id === user.id) {
        await PhotoService.delete(id);
        res.status(200).json(formatResponse(200, 'Photo deleted', photo));
      } else {
        res.status(403).json(formatResponse(403, 'No rights', null, 'No rights'));
      }
    } catch (error) {
      res
        .status(500)
        .json(formatResponse(500, 'Internal server error', null, error.message));
    }
  }
}

module.exports = PhotoController;

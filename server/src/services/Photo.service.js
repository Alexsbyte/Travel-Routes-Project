const { Photo, Route, User } = require('../db/models');

class PhotoService {
  static async getAllPhotos() {
    return await Photo.findAll();
  }

  static async getPhotoById(id) {
    return await Photo.findByPk(id, {
      include: [
        {
          model: Route,
          as: 'route',
          attributes: ['title', 'description', 'category'],
          include: [
            {
              model: User,
              as: 'user',
              attributes: ['username', 'email'],
            },
          ],
        },
      ],
    });
  }

  static async createPhoto(data) {
    return await Photo.create(data);
  }

  static async createPhotos(photoArray) {
    if (!Array.isArray(photoArray) || photoArray.length === 0) {
      throw new Error('Invalid input: Expected a non-empty array of photos');
    }
    return await Photo.bulkCreate(photoArray);
  }

  static async updatePhoto(id, data) {
    const photo = await Photo.findByPk(id);
    if (!photo) return null;
    return await photo.update(data);
  }

  static async deletePhoto(id) {
    const photo = await Photo.findByPk(id);
    if (!photo) return null;
    await photo.destroy();
    return photo;
  }
}

module.exports = PhotoService;

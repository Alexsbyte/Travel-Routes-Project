const ProfileService = require('../services/Profile.service');
const formatResponse = require('../utils/formatResponse');
const UserService = require('../services/User.service');
const bcrypt = require('bcrypt');
// const sendEmail = require('../utils/sendEmail');

class ProfileController {
  static async changePhoto(req, res) {
    const { user } = res.locals; // Extract user from res.locals

    if (!req.file?.filename) {
      return res.status(400).json(formatResponse(400, 'Фотография не передана'));
    }

    const avatar = `${user.email.toLowerCase()}/${req.file.filename}`; // File name based on user email

    try {
      const updatedUser = await ProfileService.updateAvatar(user.id, avatar);
      res.status(200).json(formatResponse(200, 'Аватар успешно обновлен', updatedUser));
    } catch (error) {
      console.error('Error:', error);
      res
        .status(500)
        .json(formatResponse(500, 'Внутреняя ошибка сервера', null, error.message));
    }
  }

  static async update(req, res) {
    const { user } = res.locals;
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      return res
        .status(400)
        .json(formatResponse(400, 'Не передан новый или текущий пароль'));
    }

    try {
      const userFromDb = await UserService.getByEmail(user.email);
      const isPasswordValid = await bcrypt.compare(currentPassword, userFromDb.password);

      if (!isPasswordValid) {
        return res
          .status(401)
          .json(formatResponse(401, 'Неверно введен текущий пароль.'));
      }

      const hashedNewPassword = await bcrypt.hash(newPassword, 10);
      const updatedUser = await ProfileService.updatePassword(user.id, hashedNewPassword);

      res.status(200).json(formatResponse(200, 'Пароль успешно обновлен', updatedUser));
    } catch (error) {
      console.error('Error:', error);
      res
        .status(500)
        .json(formatResponse(500, 'Внутреняя ошибка сервера', null, error.message));
    }
  }

  static async changeUsername(req, res) {
    const { user } = res.locals;
    const { newUsername } = req.body;

    if (!newUsername) {
      return res
        .status(400)
        .json(formatResponse(400, 'Новое имя пользователя не передано.'));
    }

    try {
      const updatedUser = await ProfileService.updateUsername(user.id, newUsername);
      res
        .status(200)
        .json(formatResponse(200, 'Имя пользователя успешно обновлено', updatedUser));
    } catch (error) {
      console.error('Error:', error);
      res
        .status(500)
        .json(formatResponse(500, 'Внутреняя ошибка сервера', null, error.message));
    }
  }
}

module.exports = ProfileController;

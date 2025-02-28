const ProfileService = require('../services/Profile.service');
const formatResponse = require('../utils/formatResponse');
const UserService = require('../services/User.service');
const bcrypt = require('bcrypt');
const UserValidator = require('../utils/User.validator');
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

  static async changePassword(req, res) {
    const { user } = res.locals;
    const { oldPass, newPass } = req.body;

    if (!oldPass || !newPass) {
      return res
        .status(400)
        .json(formatResponse(400, 'Не передан новый или текущий пароль'));
    }

    if (oldPass.length > 30 || newPass.length > 30) {
      return res
        .status(400)
        .json(formatResponse(400, 'Пароль не может быть больше 30 символов'));
    }

    const isValidPass = UserValidator.validatePassword(newPass);

    if (!isValidPass) {
      return res
        .status(400)
        .json(
          formatResponse(
            400,
            'Пароль должен быть непустой строкой, содержать только символы английского алфавита, содержать не менее 8 символов, одну заглавную букву, одну строчную букву, одну цифру и один специальный символ.',
          ),
        );
    }

    try {
      const userFromDb = await UserService.getByEmail(user.email);

      const isSamePassword = await bcrypt.compare(newPass, userFromDb.password);

      if (isSamePassword) {
        return res
          .status(400)
          .json(formatResponse(400, 'Старый и новый пароль совпадают!'));
      }
      const isPasswordValid = await bcrypt.compare(oldPass, userFromDb.password);

      if (!isPasswordValid) {
        return res
          .status(401)
          .json(formatResponse(401, 'Неверно введен текущий пароль.'));
      }

      const hashedNewPassword = await bcrypt.hash(newPass, 10);
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

    if (newUsername.length > 15) {
      return res
        .status(400)
        .json(formatResponse(400, 'Имя пользователя не может быть больше 15 символов'));
    }

    try {
      console.log(newUsername, user.username);

      if (newUsername === user.username) {
        return res
          .status(400)
          .json(formatResponse(400, 'Вы ввели тоже самое имя пользователя.'));
      }

      const updatedUser = await ProfileService.updateUsername(user.id, newUsername);

      delete updatedUser.password;

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

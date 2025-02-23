const { User } = require('../db/models');

class UserService {
  static async create(data) {
    return await User.create(data);
  }

  static async getByEmail(email) {
    return await User.findOne({ where: { email } });
  }

  static async getByToken(token) {
    return await User.findOne({ where: { verificationToken: token } });
  }

  static async update(user_id, data) {
    const [_, updatedUsers] = await User.update(data, {
      where: { id: user_id },
      returning: true, // Возвращает обновлённые данные
    });
  
    return updatedUsers[0]; // Возвращаем первого обновлённого пользователя
  }
}

module.exports = UserService;

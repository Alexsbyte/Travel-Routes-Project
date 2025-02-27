const UserService = require('./User.service'); // Assuming you have a UserService to interact with users

class ProfileService {
  static async updateAvatar(userId, avatar) {
    try {
      const updatedUser = await UserService.update(userId, { avatar });
      return updatedUser;
    } catch (error) {
      throw new Error('Ошибка во время обновления аватара: ' + error.message);
    }
  }

  static async updatePassword(userId, newPassword) {
    try {
      // Update the password for the user in the database
      const updatedUser = await UserService.update(userId, { password: newPassword });
      return updatedUser;
    } catch (error) {
      throw new Error('Ошибка смены пароля: ' + error.message);
    }
  }

  static async updateUsername(userId, newUsername) {
    try {
      // Update the username for the user in the database
      const updatedUser = await UserService.update(userId, { username: newUsername });
      return updatedUser;
    } catch (error) {
      throw new Error('Ошибка при смене имени пользоватея: ' + error.message);
    }
  }
}

module.exports = ProfileService;

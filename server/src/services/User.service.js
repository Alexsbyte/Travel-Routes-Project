const { Op } = require('sequelize');
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

  static async update(id, updates) {
		try {
			const user = await User.findByPk(id)
			if (!user) {
				throw new Error('User not found')
			}
			await user.update(updates)
			return user
		} catch (error) {
			console.error('Error in update:', error)
			throw error
		}
	}

  static async getByResetToken(token) {
		try {
			const user = await User.findOne({
				where: {
					resetToken: token,
					// resetTokenExpiry: {
					// 	[Op.gt]: Date.now(), //! Проверяем, что resetTokenExpiry больше текущего времени
					// },
				},
			})

			if (!user) {
				return null //! Если пользователь не найден или токен истек, возвращаем null
			}

			return user //! Возвращаем найденного пользователя
		} catch (error) {
			console.error('Error in getByResetToken:', error)
			throw error
		}
	}

  // static async update(user_id, data) {
  //   const [_, updatedUsers] = await User.update(data, {
  //     where: { id: user_id },
  //     returning: true, // Возвращает обновлённые данные
  //   });
  
  //   return updatedUsers[0]; // Возвращаем первого обновлённого пользователя
  // }
}

module.exports = UserService;

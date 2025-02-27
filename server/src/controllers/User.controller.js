const bcrypt = require('bcrypt');
const UserService = require('../services/User.service');
const formatResponse = require('../utils/formatResponse');
const UserValidator = require('../utils/User.validator');
const cookiesConfig = require('../config/cookiesConfig');
const generateTokens = require('../utils/generateTokens');
const crypto = require('crypto');
const sendEmail = require('../utils/sendEmail');

class UserController {
  static async refreshTokens(req, res) {
    try {
      const { user } = res.locals;

      const { accessToken, refreshToken } = generateTokens({ user });

      res.status(200).cookie('refreshToken', refreshToken, cookiesConfig).json(
        formatResponse(200, 'Successfully generated new tokens', {
          user,
          accessToken,
        }),
      );
    } catch ({ message }) {
      console.error(message);
      res.status(500).json(formatResponse(500, 'Internal server error', null, message));
    }
  }

  static async signUp(req, res) {
    const { email, username, password } = req.body;
    const { isValid, error } = UserValidator.validateSignUp({
      email,
      username,
      password,
    });

    if (!isValid) {
      return res.status(400).json(formatResponse(400, 'Validation error', null, error));
    }

    const normalizedEmail = email.toLowerCase();
    let avatar = 'placeholder/placeholder.png';

    if (req.file?.filename) {
      avatar = normalizedEmail + '/' + req.file.filename;
    }

    try {
      const userFound = await UserService.getByEmail(normalizedEmail);
      if (userFound) {
        return res
          .status(400)
          .json(
            formatResponse(
              400,
              'Пользовтель с такой почтой уже существует',
              null,
              'Пользовтель с такой почтой уже существует',
            ),
          );
      }
      const hashedPassword = await bcrypt.hash(password, 10);

      const verificationToken = crypto.randomBytes(32).toString('hex');
      const resetTokenExpiry = Date.now() + 3600000;
      const newUser = await UserService.create({
        email: normalizedEmail,
        username,
        avatar,
        password: hashedPassword,
        isVerified: false,
        verificationToken,
        verificationTokenExpiry: resetTokenExpiry, // ✅ Сохраняем срок действия
      });

      const confirmLink = `${process.env.CLIENT_URL}/verify-email?token=${verificationToken}`;

      const emailSent = await sendEmail(
        email,
        'Подтверждение email',
        `Здравствуйте!  
Для подтверждения вашего email перейдите по ссылке: ${confirmLink}  
Если вы не регистрировались, проигнорируйте это письмо.`,
        `<p>Перейдите по ссылке, чтобы подтвердить вашу почту: <a href="${confirmLink}">${confirmLink}</a></p>`,
      );

      if (!emailSent) {
        console.error('Error details:', emailSent);
        return res
          .status(400)
          .json(
            formatResponse(
              400,
              'Ошибка при отправке письма',
              null,
              'Ошибка при отправке письма',
            ),
          );
      }

      res
        .status(201)
        .json(
          formatResponse(
            201,
            'Проверьте вашу почту, чтобы подтвердить свой аккаунт',
            newUser,
          ),
        );
    } catch ({ message }) {
      console.error(message);
      res.status(500).json(formatResponse(500, 'Internal server error', null, message));
    }
  }

  static async verifyEmail(req, res) {
    const { token } = req.query;
    // const { token } = req.params;

    if (!token) {
      return res.status(400).json(formatResponse(400, 'Token is required'));
    }

    try {
      const user = await UserService.getByToken(token);
      if (!user) {
        return res.status(400).json(formatResponse(400, 'Token expired or invalid'));
      }

      await UserService.update(user.id, {
        isVerified: true,
        verificationToken: null,
        verificationTokenExpiry: null,
      });

      res.status(200).json(formatResponse(200, 'Почта верифицирована'));
    } catch (error) {
      console.error('Ошибка:', error);
      res
        .status(500)
        .json(formatResponse(500, 'Internal server error', null, error.message));
    }
  }

  static async signIn(req, res) {
    const { email, password } = req.body;

    const { isValid, error } = UserValidator.validateSignIn({
      email,
      password,
    });

    if (!isValid) {
      return res.status(400).json(formatResponse(400, 'Validation error', null, error));
    }
    const normalizedEmail = email.toLowerCase();

    try {
      const user = await UserService.getByEmail(normalizedEmail);

      if (!user) {
        return res
          .status(404)
          .json(formatResponse(404, 'User with this email not found', null));
      }
      // if (!user.isVerified) {
      //   return res
      //     .status(401)
      //     .json(
      //       formatResponse(
      //         401,
      //         'Please verify your email first.',
      //         null,
      //         'Email not verified',
      //       ),
      //     );
      // }

      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res
          .status(401)
          .json(formatResponse(401, 'Invalid password.', null, 'Invalid password.'));
      }

      const plainUser = user.get({ plain: true });
      delete plainUser.password;

      const { accessToken, refreshToken } = generateTokens({ user: plainUser });
      res
        .status(200)
        .cookie('refreshToken', refreshToken, cookiesConfig)
        .json(
          formatResponse(200, 'Login successful', {
            user: plainUser,
            accessToken,
          }),
        );
    } catch ({ message }) {
      console.error(message);
      res.status(500).json(formatResponse(500, 'Internal server error', null, message));
    }
  }

  static async signOut(req, res) {
    console.log(req.cookies);
    try {
      res.clearCookie('refreshToken').json(formatResponse(200, 'Logout successful'));
    } catch ({ message }) {
      console.error(message);
      res.status(500).json(formatResponse(500, 'Internal server error', null, message));
    }
  }
}

module.exports = UserController;

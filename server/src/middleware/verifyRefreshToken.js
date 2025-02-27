require('dotenv').config();
const jwt = require('jsonwebtoken');
const formatResponse = require('../utils/formatResponse');
const UserService = require('../services/User.service');

async function verifyRefreshToken(req, res, next) {
  try {
    const { refreshToken } = req.cookies;

    const { user } = jwt.verify(refreshToken, process.env.SECRET_REFRESH_TOKEN);

    res.locals.user = await checkUsername(user);
    // res.locals.user = user;

    next();
  } catch ({ message }) {
    console.log('======= Invalid refresh token =======', message);

    res
      .status(401)
      .clearCookie('refreshToken')
      .json(formatResponse(401, 'Invalid refresh token', null, 'Invalid refresh token'));
  }
}

async function checkUsername(user) {
  const userFromDb = await UserService.getByEmail(user.email);
  if (user.username !== userFromDb.username) {
    user.username = userFromDb.username;
  }

  return user;
}

module.exports = verifyRefreshToken;

const router = require('express').Router();
const UserController = require('../controllers/User.controller');
const verifyRefreshToken = require('../middleware/verifyRefreshToken');

router

  .get('/refreshTokens', verifyRefreshToken, UserController.refreshTokens)

  .post('/signUp', UserController.signUp)

  .get('/verify-email', UserController.verifyEmail)

  .post('/signIn', UserController.signIn)

  .post('/signOut', UserController.signOut);

module.exports = router;

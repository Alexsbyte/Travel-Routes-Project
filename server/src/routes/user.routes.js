const router = require('express').Router();
const UserController = require('../controllers/User.controller');
const verifyRefreshToken = require('../middleware/verifyRefreshToken');
const upload = require('../config/multerConfig');

router

  .get('/refreshTokens', verifyRefreshToken, UserController.refreshTokens)

  .post('/signUp', upload.single('avatar'), UserController.signUp)

  .post('/signIn', UserController.signIn)

  .post('/signOut', UserController.signOut);

module.exports = router;

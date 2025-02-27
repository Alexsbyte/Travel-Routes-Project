const router = require('express').Router();
const ProfileController = require('../../controllers/Profile.controller');
const verifyAccessToken = require('../../middleware/verifyAccessToken');
const upload = require('../../config/multerConfig');

router
  .put('/changePhoto', upload.single('avatar'), ProfileController.changePhoto)
  .put('/changePassword', verifyAccessToken, ProfileController.changePassword)
  .put('/changeUsername', verifyAccessToken, ProfileController.changeUsername);

module.exports = router;

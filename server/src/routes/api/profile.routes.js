const router = require('express').Router();
const ProfileController = require('../../controllers/Profile.controller');
const verifyAccessToken = require('../../middleware/verifyAccessToken');
const upload = require('../../config/multerConfig');

router
  .put('/changePhoto', upload.single('avatar'), ProfileController.changePhoto)
  .put('/changePassword', verifyAccessToken, ProfileController.update)
  .put('/changeUsername', verifyAccessToken, ProfileController.delete);

module.exports = router;

const router = require('express').Router();
const RouteController = require('../../controllers/Route.controller');
const verifyAccessToken = require('../../middleware/verifyAccessToken');
const upload = require('../../config/multerConfig');

router

  .get('/', RouteController.getAll)
  .post('/', verifyAccessToken, upload.array('files', 6), RouteController.create)
  .put('/:id', verifyAccessToken, RouteController.update)
  .delete('/:id', verifyAccessToken, RouteController.delete);

module.exports = router;

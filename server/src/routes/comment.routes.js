const router = require('express').Router();
const verifyAccessToken = require('../middleware/verifyAccessToken');
const CommentController = require('../controllers/Comment.controller');

router

  .get('/user/comments', verifyAccessToken, CommentController.getAllUserComments)
  .get('/routes/:route_id', verifyAccessToken, CommentController.getOneRouteComment)
  .post('/', verifyAccessToken, CommentController.createComment)
  .delete('/:comment_id', verifyAccessToken, CommentController.deleteComment);

module.exports = router;

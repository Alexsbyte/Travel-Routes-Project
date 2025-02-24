const CommentService = require('../services/Comment.service');
const formatResponse = require('../utils/formatResponse');

class CommentController {
  static async getOneRouteComment(req, res) {
    try {
      const { route_id } = req.params;
      const comments = await CommentService.getByRouteId(route_id);
      return res.status(200).json(formatResponse(200, 'Comments found', comments));
    } catch ({ message }) {
      console.error(message);
      res.status(500).json(formatResponse(500, 'Internal server error', null, message));
    }
  }

  static async getAllUserComments(req, res) {
    try {
      const { user } = res.locals;
      const user_id = user.id;
      const comments = await CommentService.getAll(user_id);

      if (!comments || comments.length === 0) {
        return res.status(200).json(formatResponse(200, 'No comments found', []));
      }

      return res.status(200).json(formatResponse(200, 'Comments found', comments));
    } catch ({ message }) {
      console.error(message);
      res.status(500).json(formatResponse(500, 'Internal server error', null, message));
    }
  }

  static async createComment(req, res) {
    try {
      const { user } = res.locals;
      const user_id = user.id;
      const { route_id, text } = req.body;
      if (!text || !route_id) {
        return res
          .status(400)
          .json(formatResponse(400, 'Text and trailId are required', null));
      }
      const comment = await CommentService.create(user_id, route_id, text);
      return res.status(201).json(formatResponse(201, 'success', comment));
    } catch ({ message }) {
      console.error(message);
      res.status(500).json(formatResponse(500, 'Internal server error', null, message));
    }
  }

  static async deleteComment(req, res) {
    try {
      const { user } = res.locals;
      const user_id = user.id;
      const { comment_id } = req.params;
      console.log('Current User ID:', user_id);
      console.log('Comment ID to delete:', comment_id);

      const comment = await CommentService.getById(comment_id);
      console.log('Comment User ID:', comment.user_id);

      if (!comment) {
        return res
          .status(404)
          .json(formatResponse(404, 'comment not found', null, 'comment not found'));
      }
      if (comment.user_id !== user_id) {
        console.log('User IDs do not match');
        return res
          .status(400)
          .json(
            formatResponse(
              400,
              'No rights to delete comment',
              null,
              'No rights to delete comment',
            ),
          );
      }
      const deleteComment = await CommentService.delete(comment_id);

      res
        .status(200)
        .json(formatResponse(200, 'Comment successfully deleted', deleteComment));
    } catch ({ message }) {
      console.error(message);
      res.status(500).json(formatResponse(500, 'Internal server error', null, message));
    }
  }
}

module.exports = CommentController;

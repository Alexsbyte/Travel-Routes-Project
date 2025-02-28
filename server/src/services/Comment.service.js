const { Comment, Route, User } = require('../db/models');

class CommentService {
  static async getById(id) {
    return await Comment.findByPk(id, {
      include: [
        { model: Route, as: 'routeComment' },
        { model: User, as: 'userComment' },
      ], 
    });
  }

  static async getAll(user_id, route_id) {
    return await Comment.findAll({
      where: { user_id, route_id },
      include: [
        { model: Route, as: 'routeComment' },
        { model: User, as: 'userComment' },
      ],
    });
  }

  static async create(user_id, route_id, text) {
    const newComment = await Comment.create({ user_id, route_id, text });
    return await this.getById(newComment.id);
  }

  static async getByRouteId(route_id) {
    const comments = await Comment.findAll({
      where: { route_id },
      include: [{ model: User, as: 'userComment' }],
    });
    return comments;
  }

  static async delete(comment_id) {
    const comment = await this.getById(comment_id);
    if (!comment) return null;
    if (comment) {
      await comment.destroy();
    }
    return comment;
  }
}

module.exports = CommentService;

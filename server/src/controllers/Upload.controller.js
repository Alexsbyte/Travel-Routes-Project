const formatResponse = require('../utils/formatResponse');

module.exports = class UploadController {
  static async singleFile(req, res) {
    try {
      console.log(req.file);
    } catch ({ message }) {
      console.error(message);
      res.status(500).json(formatResponse(500, 'Internal server error', null, message));
    }
  }
};

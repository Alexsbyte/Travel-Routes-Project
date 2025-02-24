class CommentValidator {
  static validate(data) {
    const { text } = data;
    if (!text || typeof text !== 'string' || text.trim() === '') {
      return {
        isValid: false,
        error: 'Введите корректный комментарий',
      };
    }
    return {
      isValid: true,
      error: null,
    };
  }
}

module.exports = CommentValidator;

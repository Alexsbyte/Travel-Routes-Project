class RouteValidator {
  static validateCreate(data) {
    const { title, description, category, photos, points} = data;

    if (!title || typeof title !== 'string' || title.trim() === '') {
      return {
        isValid: false,
        error: 'Title is required and must be a non-empty string.',
      };
    }

    if (description && typeof description !== 'string') {
      return {
        isValid: false,
        error: 'Description must be a string if provided.',
      };
    }

    const validCategories = ['автомобильный', 'пеший', 'велосипедный'];
    if (!category || !validCategories.includes(category)) {
      return {
        isValid: false,
        error: `Category must be one of the following: ${validCategories.join(', ')}`,
      };
    }

    if (!photos || photos.length < 1 || photos.length > 6) {
      return {
        isValid: false,
        error: 'Photos must be between 1 and 6 images.',
      };
    }

    const allowedExtensions = ['.png', '.jpeg', '.jpg'];
    for (const photo of photos) {
      const extension = photo.originalname.split('.').pop().toLowerCase();
      if (!allowedExtensions.includes(`.${extension}`)) {
        return {
          isValid: false,
          error: 'Each photo must be in PNG, JPEG or JPG format.',
        };
      }

      const maxSizeInBytes = 5 * 1024 * 1024; // 5 MB
      if (photo.size > maxSizeInBytes) {
        return {
          isValid: false,
          error: 'Each photo must be less than 5MB.',
        };
      }
    }


    return {
      isValid: true,
      error: null,
    };
  }

  static validateUpdate(data) {
    const { title, description, category } = data;

    if (title && (typeof title !== 'string' || title.trim() === '')) {
      return {
        isValid: false,
        error: 'Title must be a non-empty string if provided.',
      };
    }

    if (description && typeof description !== 'string') {
      return {
        isValid: false,
        error: 'Description must be a string if provided.',
      };
    }

    if (category && !['автомобильный', 'пеший', 'велосипедный'].includes(category)) {
      return {
        isValid: false,
        error:
          'Category must be one of the following: автомобильный, пеший, велосипедный.',
      };
    }

    return {
      isValid: true,
      error: null,
    };
  }
}

module.exports = RouteValidator;

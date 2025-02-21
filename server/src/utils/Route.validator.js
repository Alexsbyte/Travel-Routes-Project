class RouteValidator {
    static validateCreate(data) {
      const { title, description, category } = data;
  
      if (!title || typeof title !== "string" || title.trim() === "") {
        return {
          isValid: false,
          error: "Title is required and must be a non-empty string.",
        };
      }
  
      if (description && typeof description !== "string") {
        return {
          isValid: false,
          error: "Description must be a string if provided.",
        };
      }
  
      const validCategories = ['автомобильный', 'пеший', 'велосипедный'];
      if (!category || !validCategories.includes(category)) {
        return {
          isValid: false,
          error: `Category must be one of the following: ${validCategories.join(", ")}`,
        };
      }
  
      return {
        isValid: true,
        error: null,
      };
    }
  
    static validateUpdate(data) {
      const { title, description, category } = data;
  
      if (title && (typeof title !== "string" || title.trim() === "")) {
        return {
          isValid: false,
          error: "Title must be a non-empty string if provided.",
        };
      }
  
      if (description && typeof description !== "string") {
        return {
          isValid: false,
          error: "Description must be a string if provided.",
        };
      }
  
      if (category && !['автомобильный', 'пеший', 'велосипедный'].includes(category)) {
        return {
          isValid: false,
          error: "Category must be one of the following: автомобильный, пеший, велосипедный.",
        };
      }
  
      return {
        isValid: true,
        error: null,
      };
    }
  }
  
  module.exports = RouteValidator;
  
class UserValidator {
  static validateSignUp(data) {
    const { username, email, password } = data;

    if (!username || typeof username !== 'string' || username.trim() === '') {
      return {
        isValid: false,
        error: 'Username is required and must be a non-empty string.',
      };
    }
    if (
      !email ||
      typeof email !== 'string' ||
      email.trim() === '' ||
      !this.validateEmail(email)
    ) {
      return {
        isValid: false,
        error:
          'Email is required, must be a non-empty string, and must be a valid email address.',
      };
    }

    if (
      !password ||
      typeof password !== 'string' ||
      password.trim() === '' ||
      !this.validatePassword(password)
    ) {
      return {
        isValid: false,
        error:
          'Пароль должен быть непустой строкой, содержать только символы английского алфавита, содержать не менее 8 символов, одну заглавную букву, одну строчную букву, одну цифру и один специальный символ.',
      };
    }
    return {
      isValid: true,
      error: null,
    };
  }

  static validateSignIn(data) {
    const { email, password } = data;

    if (
      !email ||
      typeof email !== 'string' ||
      email.trim() === '' ||
      !this.validateEmail(email)
    ) {
      return {
        isValid: false,
        error:
          'Электронная почта обязательна и должна быть действительным адресом электронной почты.',
      };
    }

    if (!password || typeof password !== 'string' || password.trim() === '') {
      return {
        isValid: false,
        error: 'Пароль обязателен и не должен быть пустой строкой.',
      };
    }
    return {
      isValid: true,
      error: null,
    };
  }
  static validateEmail(email) {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailPattern.test(email);
  }

  static validatePassword(password) {
    const hasUpperCase = /[A-Z]/;
    const hasLowerCase = /[a-z]/;
    const hasNumbers = /\d/;
    const hasSpecialCharacters = /[!@#$%^&*()-,.?":{}|<>]/;
    const isValidLength = password.length >= 8;

    if (
      !hasUpperCase.test(password) ||
      !hasLowerCase.test(password) ||
      !hasNumbers.test(password) ||
      !hasSpecialCharacters.test(password) ||
      !isValidLength
    ) {
      return false;
    } else {
      return true;
    }
  }
}

module.exports = UserValidator;

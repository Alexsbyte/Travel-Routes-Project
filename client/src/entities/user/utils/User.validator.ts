import { ISignInData, ISignUpData } from '../model';

interface IValidationResult {
  isValid: boolean;
  error: string | null;
}

export class UserValidator {
  static validateSignUp(data: ISignUpData): IValidationResult {
    const { username, email, password } = data;

    if (!username || typeof username !== 'string' || username.trim() === '') {
      return {
        isValid: false,
        error: 'Введите корректный логин',
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
        error: 'Введите корректный адрес электронной почты',
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
          'Пароль должен содеражть не менее 8 символов, содержать хотя бы одну заглавную букву, а также цифру, символ и строчные буквы.',
      };
    }

    return {
      isValid: true,
      error: null,
    };
  }

  static validateSignIn(data: ISignInData): IValidationResult {
    const { email, password } = data;

    if (
      !email ||
      typeof email !== 'string' ||
      email.trim() === '' ||
      !this.validateEmail(email)
    ) {
      return {
        isValid: false,
        error: 'Неверный логин или пароль',
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
        error: 'Неверный логин или пароль',
      };
    }

    return {
      isValid: true,
      error: null,
    };
  }

  static validateEmail(email: string): boolean {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailPattern.test(email);
  }

  static validatePassword(password: string): boolean {
    const hasUpperCase = /[A-Z]/;
    const hasLowerCase = /[a-z]/;
    const hasNumbers = /\d/;
    const hasSpecialCharacters = /[!@#$%^&*()-,.?":{}|[\]<>]/;
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

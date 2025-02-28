import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './RegistrationForm.module.css';
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useAppSelector } from '@/shared/hooks/reduxHooks';
import { CLIENT_ROUTES } from '@/shared/enums/client_routes';
import { ISignUpData, UserValidator } from '@/entities/user';
import { message as antMessage } from 'antd';

interface RegFormProps {
  handleSignUp: (data: ISignUpData) => Promise<void>;
  onSwitch: () => void;
}

export function RegistrationForm({
  handleSignUp,
  onSwitch,
}: RegFormProps): React.JSX.Element {
  const { register, handleSubmit } = useForm<ISignUpData>();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const loading = useAppSelector((state) => state.user.loading);

  const submitHandler: SubmitHandler<ISignUpData> = async (data) => {
    try {
      const { isValid, error: validateError } = UserValidator.validateSignUp(data);
      if (!isValid) {
        antMessage.error(validateError);
        return;
      }
      if (data.password !== data.confirmPassword) {
        antMessage.error('Пароли не совпадают');
        return;
      }
      await handleSignUp({
        username: data.username,
        email: data.email,
        password: data.password,
        confirmPassword: data.confirmPassword,
      });
      navigate(CLIENT_ROUTES.HOME);
    } catch (error) {
      console.log(error);

      antMessage.error('Ошибка регистрации, попробуйте снова.');
    }
  };

  return (
    <form onSubmit={handleSubmit(submitHandler)} className={styles.authForm}>
      <div>
        <input
          type="text"
          {...register('username', { required: 'Введите имя пользователя' })}
          className={styles.input}
          placeholder="Введите логин"
        />
      </div>
      <div>
        <input
          type="email"
          {...register('email', { required: 'Введите email' })}
          className={styles.input}
          placeholder="Введите почту"
        />
      </div>
      <div className={styles.passwordContainer}>
        <input
          type={showPassword ? 'text' : 'password'}
          {...register('password', { required: 'Введите пароль' })}
          className={styles.input}
          placeholder="Введите пароль"
        />
        <span className={styles.eyeIcon} onClick={() => setShowPassword((prev) => !prev)}>
          {showPassword ? <FaRegEye /> : <FaRegEyeSlash />}
        </span>
      </div>
      <div className={styles.passwordContainer}>
        <input
          type={showPassword ? 'text' : 'password'}
          {...register('confirmPassword', { required: 'Подтвердите пароль' })}
          className={styles.input}
          placeholder="Повторите пароль"
        />
        <span className={styles.eyeIcon} onClick={() => setShowPassword((prev) => !prev)}>
          {showPassword ? <FaRegEye /> : <FaRegEyeSlash />}
        </span>
      </div>
      <button className={styles.button} type="submit" disabled={loading}>
        {loading ? 'Загрузка...' : 'Зарегистрироваться'}
      </button>
      <p className={styles.switchText}>
        Уже зарегистрированы? <span onClick={onSwitch}>Войдите </span>
      </p>
    </form>
  );
}

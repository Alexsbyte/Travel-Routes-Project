import React, { useState } from 'react';
import styles from './AuthorizationForm.module.css';
import { useNavigate } from 'react-router-dom';
import { EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons';
import { useAppSelector } from '@/shared/hooks/reduxHooks';
import { UserValidator, ISignInData } from '@/entities/user';
import { message as antMessage } from 'antd';

import { useForm, SubmitHandler } from 'react-hook-form';
import { CLIENT_ROUTES } from '@/shared/enums/client_routes';

interface AuthFormProps {
  handleSignIn: (data: ISignInData) => Promise<void>;
  onSwitch: () => void;
}
export function AuthorizationForm({
  handleSignIn,
}: // onSwitch,
AuthFormProps): React.JSX.Element {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const loading = useAppSelector((state) => state.user.loading);

  const { register, handleSubmit } = useForm<ISignInData>();

  const submitHandlerAuth: SubmitHandler<ISignInData> = async (data) => {
    try {
      const { isValid, error: validateError } = UserValidator.validateSignIn(data);
      if (!isValid) {
        antMessage.error(validateError);
        return;
      }
      await handleSignIn(data);
      navigate(CLIENT_ROUTES.HOME);
    } catch (error) {
      console.error(error);
      antMessage.error('Ошибка авторизации');
    }
  };

  return (
    <form onSubmit={handleSubmit(submitHandlerAuth)} className={styles.authForm}>
      <div>
        <input
          type="email"
          {...register('email', { required: 'Введите email' })}
          className={styles.input}
          placeholder="Введите почту"
          required
        />
      </div>
      <div className={styles.passwordContainer}>
        <input
          type={showPassword ? 'text' : 'password'}
          {...register('password', { required: 'Введите пароль' })}
          className={styles.input}
          placeholder="Введите пароль"
          required
        />
        <span className={styles.eyeIcon} onClick={() => setShowPassword((prev) => !prev)}>
          {showPassword ? <EyeInvisibleOutlined /> : <EyeOutlined />}
        </span>
      </div>
      <button className={styles.button} type="submit" disabled={loading}>
        {loading ? 'Вход...' : 'Авторизоваться'}
      </button>
      {/* <p className={styles.switchText}>
        Нет аккаунта? <span onClick={onSwitch}>Зарегистрироваться </span>
      </p> */}
    </form>
  );
}

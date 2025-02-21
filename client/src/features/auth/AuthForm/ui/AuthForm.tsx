import React, { useState, SyntheticEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../ui/AuthForm.module.css';
import { CLIENT_ROUTES } from '@/shared/enums/client_routes';
import { ISignInData, ISignUpData } from '@/entities/user';

const inputsInitialState = {
  email: '',
  username: '',
  avatar: null,
  password: '',
  confirmPassword: '',
};

type InputsType = {
  username: string;
  email: string;
  avatar: File | null;
  password: string;
  confirmPassword: string;
};

interface Props {
  type: 'signin' | 'signup';
  handleSignIn: (data: ISignInData) => void;
  handleSignUp: (data: ISignUpData) => void;
}

export function AuthForm({ type, handleSignIn, handleSignUp }: Props) {
  const [inputs, setInputs] = useState<InputsType>(inputsInitialState);
  const navigate = useNavigate();

  const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputs((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };

  async function submitHandler(event: SyntheticEvent<HTMLFormElement>) {
    event.preventDefault();
    const { email, username, avatar, password } = inputs;
    console.log(avatar);

    if (type === 'signin') {
      handleSignIn({ email: email.toLowerCase(), password });
    } else {
      if (password !== inputs.confirmPassword) {
        console.error('Пароли не совпадают.');
        return;
      }
      handleSignUp({ username, email: email.toLowerCase(), avatar, password });
    }

    setInputs(inputsInitialState);
    navigate(CLIENT_ROUTES.HOME); // можно перенаправить на главную страницу, если необходимо
  }

  const onFileChangeHandler = (e: React.ChangeEvent<HTMLInputElement>): void => {
    if (e.target.files) {
      const file = e.target.files[0];
      console.log(file);

      setInputs((prev) => ({ ...prev, avatar: file }));
    }
  };

  return (
    <form className={styles.authForm} onSubmit={submitHandler}>
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={inputs.email}
        onChange={onChangeHandler}
        required
      />
      <input
        className={styles.input}
        type="password"
        name="password"
        placeholder="Пароль"
        value={inputs.password}
        onChange={onChangeHandler}
        required
      />
      {type === 'signup' && (
        <>
          <input
            className={styles.input}
            type="password"
            name="confirmPassword"
            placeholder="Повторите пароль"
            value={inputs.confirmPassword}
            onChange={onChangeHandler}
            required
          />
          <input
            className={styles.input}
            type="text"
            name="username"
            placeholder="Имя пользователя"
            value={inputs.username}
            onChange={onChangeHandler}
            required
          />
          <input
            className={styles.input}
            type="file"
            name="avatar"
            accept="image/*"
            onChange={onFileChangeHandler}
          />
        </>
      )}
      <button className={styles.button} type="submit">
        {type === 'signin' ? 'Войти' : 'Зарегистрироваться'}
      </button>
    </form>
  );
}

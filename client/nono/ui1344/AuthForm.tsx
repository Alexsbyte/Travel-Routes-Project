import React, { useState, SyntheticEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../ui/AuthForm.module.css';
import { CLIENT_ROUTES } from '@/shared/enums/client_routes';
import { message as antMessage } from 'antd';
import {
  ISignInData,
  ISignUpData,
  UserType,
  UserValidator,
} from '@/entities/user';
import { useAppSelector } from '@/shared/hooks/reduxHooks';
import { EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons';
import { IApiResponseReject, IApiResponseSuccess } from '@/shared/types';

const inputsInitialState = {
  email: '',
  username: '',
  password: '',
  confirmPassword: '',
};

type InputsType = {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
};

interface Props {
  type: 'signin' | 'signup';
  handleSignIn: (
    data: ISignInData,
  ) => Promise<IApiResponseSuccess <UserType>| IApiResponseReject>;
  handleSignUp: (
    data: ISignUpData,
  ) => Promise<IApiResponseSuccess<UserType> | IApiResponseReject>;
}

export function AuthForm({ type, handleSignIn, handleSignUp }: Props): JSX.Element {
  const [inputs, setInputs] = useState<InputsType>(inputsInitialState);
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const loading = useAppSelector((state) => state.user.loading);

  const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputs((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };

  async function submitHandler(event: SyntheticEvent<HTMLFormElement>) {
    event.preventDefault();
    const { email, password } = inputs;
    const normalizedEmail = email.toLowerCase();

    if (type === 'signin') {
      const { isValid, error: validateError } = UserValidator.validateSignIn(inputs);
      if (!isValid) {
        antMessage.error(validateError);
        return;
      }

      const response = await handleSignIn({ ...inputs, email: normalizedEmail });

      if (response?.data?.error?.toLowerCase().includes('email not confirmed')) {
        antMessage.error('Пожалуйста, подтвердите свой email!');
        return;
      }

      antMessage.success('Вы успешно вошли в систему!');
    } else {
      const { isValid, error: validateError } = UserValidator.validateSignUp(inputs);
      if (!isValid) {
        antMessage.error(validateError);
        return;
      }
      if (password !== inputs.confirmPassword) {
        antMessage.error('Пароли не совпадают');
        return;
      }

      const response = await handleSignUp({ ...inputs, email: normalizedEmail });

      if (response?.data?.error?.includes('Email already exists')) {
        antMessage.error('Пользователь с таким email уже существует');
        return;
      }

      antMessage.success('Регистрация успешна! Проверьте свою почту для подтверждения.');
    }

    setInputs(inputsInitialState);
    navigate(CLIENT_ROUTES.HOME);
  }

  return (
    <form className={styles.authForm} onSubmit={submitHandler}>
      <input
        className={styles.input}
        type="email"
        name="email"
        placeholder="Email"
        value={inputs.email}
        onChange={onChangeHandler}
        required
        //  disabled={loading}
      />
      <div className={styles.passwordContainer}>
        <input
          className={styles.input}
          type={showPassword ? 'text' : 'password'}
          name="password"
          placeholder="Пароль"
          value={inputs.password}
          onChange={onChangeHandler}
          required
        />
        <span className={styles.eyeIcon} onClick={() => setShowPassword((prev) => !prev)}>
          {showPassword ? <EyeInvisibleOutlined /> : <EyeOutlined />}
        </span>
      </div>

      {type === 'signup' && (
        <>
          <div>
            <input
              className={styles.input}
              type={showConfirmPassword ? 'text' : 'password'}
              name="confirmPassword"
              placeholder="Повторите пароль"
              value={inputs.confirmPassword}
              onChange={onChangeHandler}
              required
            />
            <span
              className={styles.eyeIcon}
              onClick={() => setShowConfirmPassword((prev) => !prev)}
            >
              {showConfirmPassword ? <EyeInvisibleOutlined /> : <EyeOutlined />}
            </span>
          </div>
          <input
            className={styles.input}
            type="text"
            name="username"
            placeholder="Имя пользователя"
            value={inputs.username}
            onChange={onChangeHandler}
            required
          />
        </>
      )}
      <button
        className={styles.button}
        type="submit"
        disabled={loading || !inputs.email || !inputs.password}
      >
        {loading ? 'Загрузка...' : type === 'signin' ? 'Войти' : 'Зарегистрироваться'}
      </button>
    </form>
  );
}

// import React, { useState, SyntheticEvent } from 'react';
// import { useNavigate } from 'react-router-dom';
// import styles from '../ui/AuthForm.module.css';
// import { CLIENT_ROUTES } from '@/shared/enums/client_routes';
// import { message as antMessage } from 'antd';
// import { ISignInData, ISignUpData, UserValidator } from '@/entities/user';
// import { useAppSelector } from '@/shared/hooks/reduxHooks';
// import { EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons';

// const inputsInitialState = {
//   email: '',
//   username: '',
//   password: '',
//   confirmPassword: '',
// };

// type InputsType = {
//   username: string;
//   email: string;
//   password: string;
//   confirmPassword: string;
// };

// interface Props {
//   type: 'signin' | 'signup';
//   handleSignIn: (data: ISignInData) => void;
//   handleSignUp: (data: ISignUpData) => void;
// }

// export function AuthForm({ type, handleSignIn, handleSignUp }: Props): JSX.Element {
//   const [inputs, setInputs] = useState<InputsType>(inputsInitialState);
//   const navigate = useNavigate();
//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);
//   const loading = useAppSelector((state) => state.user.loading);

//   const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
//     setInputs((prev) => ({ ...prev, [event.target.name]: event.target.value }));
//   };

//   async function submitHandler(event: SyntheticEvent<HTMLFormElement>) {
//     event.preventDefault();
//     const { email, password } = inputs;
//     const normalizedEmail = email.toLowerCase();

//     if (type === 'signin') {
//       const { isValid, error: validateError } = UserValidator.validateSignIn(inputs);
//       if (!isValid) {
//         antMessage.error(validateError);
//         return;
//       }
//       const response = await handleSignIn({ ...inputs, email: normalizedEmail });
//       if (response?.data?.error?.includes('Email not confirmed')) {
//         antMessage.error('Пожалуйста, подтвердите свой email!');
//         return;
//       }

//       antMessage.success('Вы успешно вошли в систему!');
//     } else {
//       const { isValid, error: validateError } = UserValidator.validateSignUp(inputs);
//       if (!isValid) {
//         antMessage.error(validateError);
//         return;
//       }
//       if (password !== inputs.confirmPassword) {
//         antMessage.error('Пароли не совпадают');
//         return;
//       }

//       const response = await handleSignUp({ ...inputs, email: normalizedEmail });
//       if (response?.error?.includes('Email already exists')) {
//         antMessage.error('Пользователь с таким email уже существует');
//         return;
//       }

//       antMessage.success('Регистрация успешна! Проверьте свою почту для подтверждения.');
//     }

//     setInputs(inputsInitialState);
//     navigate(CLIENT_ROUTES.HOME);
//   }

//   return (
//     <form className={styles.authForm} onSubmit={submitHandler}>
//       <input
//         className={styles.input}
//         type="email"
//         name="email"
//         placeholder="Email"
//         value={inputs.email}
//         onChange={onChangeHandler}
//         required
//         disabled={loading}
//       />
//       <div className={styles.passwordContainer}>
//         <input
//           className={styles.input}
//           type={showPassword ? 'text' : 'password'}
//           name="password"
//           placeholder="Пароль"
//           value={inputs.password}
//           onChange={onChangeHandler}
//           required
//         />
//         <span className={styles.eyeIcon} onClick={() => setShowPassword((prev) => !prev)}>
//           {showPassword ? <EyeInvisibleOutlined /> : <EyeOutlined />}
//         </span>
//       </div>

//       {type === 'signup' && (
//         <>
//           <div>
//             <input
//               className={styles.input}
//               type={showConfirmPassword ? 'text' : 'password'}
//               name="confirmPassword"
//               placeholder="Повторите пароль"
//               value={inputs.confirmPassword}
//               onChange={onChangeHandler}
//               required
//             />
//             <span
//               className={styles.eyeIcon}
//               onClick={() => setShowConfirmPassword((prev) => !prev)}
//             >
//               {showConfirmPassword ? <EyeInvisibleOutlined /> : <EyeOutlined />}
//             </span>
//           </div>
//           <input
//             className={styles.input}
//             type="text"
//             name="username"
//             placeholder="Имя пользователя"
//             value={inputs.username}
//             onChange={onChangeHandler}
//             required
//           />
//         </>
//       )}
//       <button className={styles.button} type="submit" disabled={loading}>
//         {loading ? 'Загрузка...' : type === 'signin' ? 'Войти' : 'Зарегистрироваться'}
//       </button>
//     </form>
//   );
// }

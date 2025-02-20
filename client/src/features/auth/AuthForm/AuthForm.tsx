import React, { useState, SyntheticEvent } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/shared/hooks/reduxHooks";
import { unwrapResult } from "@reduxjs/toolkit";

import { CLIENT_ROUTES } from "@/shared/enums/clientRoutes";
import styles from "../ui/AuthForm.module.css";
import { signInThunk, signUpThunk, UserValidator } from "@/entities/user";

const inputsInitialState = {
  email: "",
  username: "",
  password: "",
};

interface Props {
  type: "signin" | "signup";
}

export default function AuthForm({ type }: Props) {
  const [inputs, setInputs] = useState(inputsInitialState);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const loading = useAppSelector((state) => state.user.loading);

  const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputs((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };

  async function submitHandler(event: SyntheticEvent<HTMLFormElement>) {
    event.preventDefault();
    const { email } = inputs;
    const normalizedEmail = email.toLowerCase();

    if (type === "signin") {
      const { isValid, error: validateError } = UserValidator.validateSignIn(inputs);
      if (!isValid) {
        console.error(validateError);
        return;
      }

      const resultAction = await dispatch(signInThunk({ email: normalizedEmail, password: inputs.password }));
      unwrapResult(resultAction);
    } else {
      const { isValid, error: validationError } = UserValidator.validateSignUp(inputs);
      if (!isValid) {
        console.error(validationError);
        return;
      }

      const resultAction = await dispatch(signUpThunk(inputs));
      unwrapResult(resultAction);
    }

    setInputs(inputsInitialState);
    navigate(CLIENT_ROUTES.HOME);
  }

  return (
    <form className={styles.authForm} onSubmit={submitHandler}>
      <input type="email" name="email" placeholder="Email" value={inputs.email} onChange={onChangeHandler} required />
      <input type="password" name="password" placeholder="Пароль" value={inputs.password} onChange={onChangeHandler} required />
      {type === "signup" && (
        <input type="text" name="username" placeholder="Имя пользователя" value={inputs.username} onChange={onChangeHandler} required />
      )}
      <button type="submit" disabled={loading}>
        {type === "signin" ? "Войти" : "Зарегистрироваться"}
      </button>
    </form>
  );
}

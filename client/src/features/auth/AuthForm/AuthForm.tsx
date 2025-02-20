import React, { useState, SyntheticEvent } from "react";
import { useNavigate } from "react-router-dom";
import { message as antMessage, Button, Input, Card } from "antd";
import { useAppDispatch, useAppSelector } from "@/shared/hooks/reduxHooks";
import { unwrapResult } from "@reduxjs/toolkit";
import { signInThunk, signUpThunk, UserValidator } from "@/entities";
import { CLIENT_ROUTES } from "@/shared/enums/clientRoutes";
import styles from "../ui/AuthForm.module.css";

const inputsInitialState = {
  email: "",
  username: "",
  password: "",
};

type InputsType = {
  email: string;
  password: string;
  username: string;
};
type Props = {
  type: string;
};

export default function AuthForm({ type }: Props) {
  const [inputs, setInputs] = useState<InputsType>(inputsInitialState);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const loading = useAppSelector((state) => state.user.loading);

  const onChangeHandler = ({
    target,
  }: React.ChangeEvent<HTMLInputElement>): void => {
    setInputs((prev) => ({ ...prev, [target.name]: target.value }));
  };
  async function submitHandler(
    event: SyntheticEvent<HTMLFormElement, SubmitEvent>
  ) {
    event.preventDefault();
    const { email } = inputs;
    const normalizedEmail = email.toLowerCase();

    if (type === "signin") {
      const { isValid, error: validateError } =
        UserValidator.validateSignIn(inputs);

      if (!isValid) {
        antMessage.error(validateError);
        return;
      }

      const resultAction = await dispatch(
        signInThunk({ ...inputs, email: normalizedEmail })
      );

      unwrapResult(resultAction);
      setInputs(inputsInitialState);
      navigate(CLIENT_ROUTES.HOME);
    } else {
      const { isValid, error: validationError } =
        UserValidator.validateSignUp(inputs);

      if (!isValid) {
        antMessage.error(validationError);
        return;
      }

      const resultAction = await dispatch(
        signUpThunk({ ...inputs, email: normalizedEmail })
      );
      unwrapResult(resultAction);
      setInputs(inputsInitialState);
      navigate(CLIENT_ROUTES.HOME);
    }
  }

  return (
    <div className={styles.authContainer}>
      <Card className={styles.authCard} title="Кто хочет стать миллионером?">
        <form onSubmit={submitHandler}>
          <Input
            className={styles.authInput}
            value={inputs.email}
            name="email"
            placeholder="Email"
            onChange={onChangeHandler}
            type="email"
            required
          />
          <Input.Password
            className={styles.authInput}
            value={inputs.password}
            name="password"
            placeholder="Пароль"
            onChange={onChangeHandler}
            required
          />
          {type === "signup" && (
            <Input
              className={styles.authInput}
              value={inputs.username}
              name="username"
              placeholder="Имя пользователя"
              onChange={onChangeHandler}
              required
            />
          )}
          <Button
            className={styles.authButton}
            type="primary"
            htmlType="submit"
            disabled={loading}
          >
            {type === "signin" ? "Войти" : "Зарегистрироваться"}
          </Button>
        </form>
      </Card>
    </div>
  );
}

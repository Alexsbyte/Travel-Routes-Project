import React, { useEffect, useState } from 'react';
import {  useNavigate, useSearchParams } from 'react-router-dom';

import { message as antMessage, Spin } from 'antd';

import { CLIENT_ROUTES } from '@/shared/enums/client_routes';
import { useAppDispatch, useAppSelector } from '@/shared/hooks/reduxHooks';
import { verifyEmailThunk } from '@/entities/user/api';

interface VerifyEmailProps {
  onSuccess: () => void; // Обработчик успеха для открытия модального окна авторизации
}

export function VerifyEmail({ onSuccess }: VerifyEmailProps): React.JSX.Element {
  //  const { token } = useParams<{ token: string }>();
   const [searchParams] = useSearchParams();
 const token = searchParams.get('token');
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const emailVerified = useAppSelector((state) => state.user.emailVerified);
  const loading = useAppSelector((state) => state.user.loading);
  const [error, setError] = useState<string | null>(null);
  console.log(token);

  useEffect(() => {
    if (token) {
      dispatch(verifyEmailThunk(token))
        .unwrap()
        .catch((error) => {
          if (error && typeof error === 'object' && 'message' in error) {
            setError(error.message); // или извлечь другие данные из error, если нужно
          } else {
            setError('Неизвестная ошибка');
          }
        });
    } else {
      setError('Токен не найден.');
    }
  }, [dispatch, token]);

  useEffect(() => {
    if (emailVerified) {
      antMessage.success('Ваш email успешно подтвержден!');
      navigate(CLIENT_ROUTES.HOME);
      onSuccess(); 
    } else if (error) {
      antMessage.error(error);
    }
  }, [emailVerified, error, navigate, onSuccess]);

  return (
    <div>
      {loading ? (
        <Spin size="large" />
      ) : (
        <p>{emailVerified ? 'Email подтвержден' : 'Ошибка подтверждения email'}</p>
      )}
    </div>
  );
}

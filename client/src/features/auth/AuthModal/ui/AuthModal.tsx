import React, { useEffect, useState } from 'react';
import { Modal } from '@mantine/core';
import { useAppDispatch } from '@/shared/hooks/reduxHooks';

import styles from './AuthModal.module.css';
import { message as antMessage } from 'antd';
import { ISignInData, ISignUpData, signInThunk, signUpThunk } from '@/entities/user';
import { RegistrationForm } from '../../auth/ui/RegistrationForm';
import { AuthorizationForm } from '../../auth/ui/AuthorizationForm';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void
  authType: 'signin' | 'signup'; // Используем authType
  onSuccess: () => void; // Добавляем обработчик успеха
}

export const AuthModal: React.FC<ModalProps> = ({ isOpen, onClose, authType}) => {
  const dispatch = useAppDispatch();
  const [isSignUp, setIsSignUp] = useState(authType === 'signup'); // Инициализируем на основе authType

   // Синхронизация isSignUp с authType
   useEffect(() => {
    setIsSignUp(authType === 'signup');
  }, [authType]);


  const handleSignUp = async (data: ISignUpData) => {
    try {
      await dispatch(signUpThunk(data)).unwrap();
      antMessage.success('Регистрация успешна! Проверьте почту для подтверждения.');
      onClose();
      //  setIsSignUp(false); // После регистрации переключаем на авторизацию
      // onSuccess(); // Вызываем onSuccess для закрытия модального окна
    } catch (error) {
      antMessage.error(error instanceof Error ? error.message : 'Ошибка регистрации');
    }
  };


  const handleSignIn = async (data: ISignInData) => {
    try {
      await dispatch(signInThunk(data)).unwrap();
      antMessage.success('Авторизация успешна!');
      onClose(); 
    } catch (error) {
      antMessage.error(error instanceof Error ? error.message : 'Ошибка авторизации');
      onClose(); 
    }
  };

  return (
    <Modal
      opened={isOpen}
      onClose={onClose}
      title={<div className={styles.modalTitle}>{isSignUp ? 'Регистрация' : 'Вход в систему'}</div>}
      centered
      overlayProps={{ backgroundOpacity: 0.6, blur: 3 }}
      transitionProps={{ transition: 'fade', duration: 200 }}
       size="lg"
      className={styles.modalContainer}
    >
      {isSignUp ? (
        <RegistrationForm handleSignUp={handleSignUp} onSwitch={() => setIsSignUp(false)} />
      ) : (
        <AuthorizationForm handleSignIn={handleSignIn} onSwitch={() => setIsSignUp(true)} />
      )}
    </Modal>
  );
};

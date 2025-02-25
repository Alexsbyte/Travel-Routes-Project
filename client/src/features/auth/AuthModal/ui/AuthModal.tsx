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
  onClose: () => void;
  authType: 'signin' | 'signup';
  onSuccess?: () => void;
}

export const AuthModal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  authType,
  onSuccess,
}) => {
  const dispatch = useAppDispatch();
  const [isSignUp, setIsSignUp] = useState(authType === 'signup'); // Инициализируем на основе authType

  useEffect(() => {
    setIsSignUp(authType === 'signup');
  }, [authType]);

  const handleSignUp = async (data: ISignUpData) => {
    try {
      const formData = new FormData();
      formData.append('email', data.email);
      formData.append('password', data.password);
      formData.append('username', data.username);

      if (data.avatar) {
        formData.append('avatar', data.avatar as Blob);
      }
      await dispatch(signUpThunk(formData)).unwrap();
      antMessage.success('Регистрация успешна! Проверьте почту для подтверждения.');
      onSuccess?.(); // ✅ Вызываем, если передан
      onClose();
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
      display={!isOpen ? 'none' : 'block'}
      opened={isOpen}
      onClose={onClose}
      centered
      overlayProps={{ backgroundOpacity: 0.6, blur: 3 }}
      transitionProps={{ transition: 'fade', duration: 200 }}
      size="lg"
      className={styles.modalContainer}
    >
      <>
        <div>
          <h2 className={styles.modalTitle}>
            {isSignUp ? 'Регистрация' : 'Вход в систему'}
          </h2>
        </div>
        {isSignUp ? (
          <RegistrationForm
            handleSignUp={handleSignUp}
            onSwitch={() => setIsSignUp(false)}
          />
        ) : (
          <AuthorizationForm
            handleSignIn={handleSignIn}
            onSwitch={() => setIsSignUp(true)}
          />
        )}
      </>
    </Modal>
  );
};

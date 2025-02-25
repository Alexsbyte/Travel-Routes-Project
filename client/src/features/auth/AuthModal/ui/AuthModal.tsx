import React from 'react';
import { Modal } from '@mantine/core';
import { useAppDispatch } from '@/shared/hooks/reduxHooks';
import { ISignUpData, signInThunk, signUpThunk } from '@/entities/user';
import { AuthForm } from '../../AuthForm';
import styles from './AuthModal.module.css';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  type: 'signin' | 'signup';
}

export const AuthModal: React.FC<ModalProps> = ({ isOpen, onClose, onSuccess, type }) => {
  const dispatch = useAppDispatch();

  const handleSignIn = async (data: { email: string; password: string }) => {
    try {
      await dispatch(signInThunk(data)).unwrap();
      onSuccess();
    } catch (error) {
      console.log('Ошибка входа:', error);
    }
  };

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
      onSuccess();
    } catch (error) {
      console.log('Ошибка регистрации:', error);
    }
  };

  return (
    <Modal
      display={!isOpen ? 'none' : 'block'}
      opened={isOpen}
      onClose={onClose}
      title={
        <div className={styles.modalTitle}>
          {type === 'signin' ? 'Вход в систему' : 'Регистрация'}
        </div>
      }
      centered
      overlayProps={{
        backgroundOpacity: 0.6,
        blur: 3,
      }}
      transitionProps={{ transition: 'fade', duration: 200 }}
      size="md"
      className={styles.modalContainer}
    >
      <AuthForm type={type} handleSignIn={handleSignIn} handleSignUp={handleSignUp} />
      {/* <Button className={styles.closeButton}  onClick={onClose}>
        Закрыть
      </Button> */}
    </Modal>
  );
};

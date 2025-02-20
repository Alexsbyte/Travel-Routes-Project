import React from "react";
import { Modal, Button } from "@mantine/core";
import AuthForm from "../AuthForm/AuthForm";
import { useAppDispatch } from "@/shared/hooks/reduxHooks";
import { signInThunk, signUpThunk } from "@/entities/user";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void; 
  type: "signin" | "signup";
}

const AuthModal: React.FC<ModalProps> = ({ isOpen, onClose, onSuccess, type }) => {
  const dispatch = useAppDispatch();

  const handleSignIn = async (data: { email: string; password: string }) => {
    try {
      await dispatch(signInThunk(data)).unwrap();
      onSuccess();  // Закрытие модального окна при успешном входе
    } catch (error) {
      console.log("Ошибка входа:", error);
    }
  };
  
  const handleSignUp = async (data: { username: string; email: string; password: string }) => {
    try {
      await dispatch(signUpThunk(data)).unwrap();
      onSuccess();  // Закрытие модального окна при успешной регистрации
    } catch (error) {
      console.log("Ошибка регистрации:", error);
    }
  };

  return (
    <Modal
      opened={isOpen}
      onClose={onClose}
      title={type === "signin" ? "Вход в систему" : "Регистрация"}
      centered
      overlayProps={{
        backgroundOpacity: 0.6,
        blur: 3,
      }}
      transitionProps={{ transition: "fade", duration: 200 }}
      size="md"
    >
      <AuthForm 
        type={type} 
        handleSignIn={handleSignIn} 
        handleSignUp={handleSignUp} 
      />
      <Button fullWidth mt="md" variant="outline" color="red" onClick={onClose}>
        Закрыть
      </Button>
    </Modal>
  );
};

export default AuthModal;

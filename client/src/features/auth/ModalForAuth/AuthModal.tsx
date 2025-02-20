import React from "react";

import styles from "./Modal.module.css";
import AuthForm from "../AuthForm/AuthForm";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: "signin" | "signup";
}

const AuthModal: React.FC<ModalProps> = ({ isOpen, onClose, type }) => {
  if (!isOpen) return null; // Не рендерим, если окно закрыто

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <button className={styles.closeButton} onClick={onClose}>
          ×
        </button>
        <AuthForm type={type} />
      </div>
    </div>
  );
};

export default AuthModal;



// const [isModalOpen, setIsModalOpen] = useState(false);
// const [authType, setAuthType] = useState<"signin" | "signup">("signin");

// const openModal = (type: "signin" | "signup") => {
//   setAuthType(type);
//   setIsModalOpen(true);
// };



{/* <nav>
<button onClick={() => openModal("signin")}>Войти</button>
<button onClick={() => openModal("signup")}>Регистрация</button>
<AuthModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} type={authType} />
</nav> */}
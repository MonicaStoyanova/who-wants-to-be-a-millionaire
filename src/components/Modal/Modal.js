import styles from "./Modal.module.css";

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <div className={styles.modalContent}>
          <span className={styles.closeButton} onClick={onClose}>
            &times;
          </span>
          {children}
        </div>
      </div>
    </div>
  );
};
export default Modal;

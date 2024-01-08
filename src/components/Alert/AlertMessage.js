import styles from "./AlertMessage.module.css";

const AlertMessage = ({ message, title, onClose }) => {
  return (
    <div className={styles.alert}>
      <h2>{title}</h2>
      <p>{message}</p>
      <button className={styles.alertBtn} onClick={onClose}>
        OK
      </button>
    </div>
  );
};
//wrap in memo
export default AlertMessage;

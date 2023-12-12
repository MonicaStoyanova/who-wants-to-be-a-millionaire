import styles from "./GameContent.module.css";

const AlertMessage = ({ message, onClose }) => {
  return (
    <div className={styles.alert}>
      <h2>No Questions Found</h2>
      <p>{message}</p>
      <button onClick={onClose}>OK</button>
    </div>
  );
};

export default AlertMessage;

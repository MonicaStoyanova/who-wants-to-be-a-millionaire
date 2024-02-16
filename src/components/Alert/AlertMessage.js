import { memo } from "react";

import styles from "./AlertMessage.module.css";

const AlertMessage = memo(({ message, title, onClose }) => {
  return (
    <div className={styles.alert}>
      <h2>{title}</h2>
      <p>{message}</p>
      <button className={styles.alertBtn} onClick={onClose}>
        OK
      </button>
    </div>
  );
});

export default AlertMessage;

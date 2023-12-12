// AlertMessage.js
import React from "react";
import styles from "./Game.module.css";

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

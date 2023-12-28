import { useTimer } from "../../hooks/useTimer";
import styles from "./Timer.module.css";

function Timer() {
  const { seconds } = useTimer();

  return (
    <div className={styles.timer}>
      <span>{seconds}</span>
    </div>
  );
}

export default Timer;

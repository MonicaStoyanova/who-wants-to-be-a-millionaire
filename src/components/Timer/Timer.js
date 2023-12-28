import { useTimer } from "../../hooks/useTimer";
import styles from "./Timer.module.css";

function Timer() {
  const { seconds, start, pause, reset, running, stop } = useTimer();

  return (
    <div className={styles.timer}>
      <button
        className="start-button"
        onClick={() => (running ? pause() : start())}
      >
        {running ? "pause" : "start"}
      </button>
      <button className="stop-button" onClick={reset}>
        reset
      </button>
      <span>{seconds}</span>
    </div>
  );
}

export default Timer;

import styles from "./Timer.module.css";

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

// we will need local state for the seconds,it should restart on question index change
const Timer = () => {
  const [seconds, setSeconds] = useState(60);
  //freezing logic for timer
  const [isPaused, setIsPaused] = useState(false);

  let navigate = useNavigate();

  const answeredQuestions = useSelector(
    (state) => state.gamePlay.answeredQuestions
  );

  // this is more readable
  useEffect(() => {
    const isTimerMoreThanZero = seconds > 0;
    if (isTimerMoreThanZero) setInterval(() => setSeconds(seconds - 1), 1000);

    const isTimerExpired = seconds === 0;
    if (isTimerExpired) navigate("/gameover");

    return () => clearInterval(isTimerMoreThanZero);
  }, [seconds]);

  // if (seconds === 0) {
  //   navigate("/gameover");
  // }
  // now we need to re-start the seconds from 60 on question index change which we can track with the state of the correct answer count

  //if the current q is 0 don`t execute, exc. only when the value is updated
  useEffect(() => {
    setSeconds(5);
  }, [answeredQuestions]);
  return (
    <div className={styles.timer}>
      <span>{seconds}</span>
    </div>
  );
};

export default Timer;

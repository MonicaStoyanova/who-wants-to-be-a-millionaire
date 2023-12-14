import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { MAX_SECONDS } from "../../utils/constants";
import styles from "./Timer.module.css";

const Timer = ({ isTimerPaused }) => {
  const [seconds, setSeconds] = useState(MAX_SECONDS);
  // 1.1st render is false, then its true;WHY?
  console.log("timerpaused begining of timer component?", { isTimerPaused });
  const navigate = useNavigate();

  const answeredQuestionsCount = useSelector(
    (state) => state.gamePlay.answeredQuestionsCount
  );

  // Since the state persists between renders we need to set them back to 60
  useEffect(() => {
    setSeconds(MAX_SECONDS);
  }, [answeredQuestionsCount]);

  // Checks if timer should decrease or has reached 0;
  useEffect(() => {
    const isTimerMoreThanZero = seconds > 0;

    let decreaseSeconds;
    if (isTimerMoreThanZero && !isTimerPaused) {
      //2. it is still false; then it goes to  1. and its true;WHY?
      console.log("decreasing of timer component?", { isTimerPaused });
      decreaseSeconds = setInterval(
        () => setSeconds((prevSeconds) => prevSeconds - 1),
        1000
      );
    }

    const isTimerExpired = seconds === 0;
    if (isTimerExpired) {
      navigate("/gameover");
      clearInterval(decreaseSeconds); // Clear the interval when the timer has expired
    }
    return () => clearInterval(decreaseSeconds); // Clear the interval on component unmount or when seconds change
  }, [seconds, isTimerPaused]);

  return (
    <div className={styles.timer}>
      <span>{seconds}</span>
    </div>
  );
};

export default Timer;

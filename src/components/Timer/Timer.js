import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { MAX_SECONDS } from "../../utils/constants";
import styles from "./Timer.module.css";
//props coming from parent Game.js
const Timer = ({ isTimerPaused }) => {
  const [seconds, setSeconds] = useState(MAX_SECONDS);
  //1.timerPaused = false; checked;
  // 12.tuk izvednuj stawa true
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
      //3.checked it is false;
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

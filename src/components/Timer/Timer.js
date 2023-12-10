import styles from "./Timer.module.css";

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

// we will need local state for the seconds,it should restart on question index change
const Timer = ({ isTimerPaused, maxSeconds }) => {
  const [seconds, setSeconds] = useState(maxSeconds);

  const navigate = useNavigate();

  const answeredQuestionsCount = useSelector(
    (state) => state.gamePlay.answeredQuestionsCount
  );

  // this is more readable
  useEffect(() => {
    const isTimerMoreThanZero = seconds > 0;

    let intervalId;
    if (isTimerMoreThanZero && !isTimerPaused) {
      intervalId = setInterval(
        () => setSeconds((prevSeconds) => prevSeconds - 1),
        1000
      );
    }

    const isTimerExpired = seconds === 0;
    if (isTimerExpired) {
      navigate("/gameover");
      clearInterval(intervalId); // Clear the interval when the timer is expired
    }

    return () => clearInterval(intervalId); // Clear the interval on component unmount or when seconds change
  }, [seconds, isTimerPaused]);

  // if (seconds === 0) {
  //   navigate("/gameover");
  // }
  // now we need to re-start the seconds from 60 on question index change which we can track with the state of the correct answer count

  //This useEffect needs to be rewriten
  //dif the current q is 0 don`t execute, exc. only when the value is updated
  useEffect(() => {
    setSeconds(maxSeconds);
  }, [answeredQuestionsCount]);
  return (
    <div className={styles.timer}>
      <span>{seconds}</span>
    </div>
  );
};

export default Timer;

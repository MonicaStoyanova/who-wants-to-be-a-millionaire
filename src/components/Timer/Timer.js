import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { MAX_SECONDS } from "../../utils/constants";
import styles from "./Timer.module.css";

const Timer = ({ isTimerPaused }) => {
  //NOT DOING THE JOB trying to change local state based on global
  const time = useSelector((state) => state.gamePlay.time);
  const [seconds, setSeconds] = useState(time);

  const navigate = useNavigate();

  const answeredQuestionsCount = useSelector(
    (state) => state.gamePlay.answeredQuestionsCount
  );

  // Since the state persists between renders we need to set them back to 60
  // useEffect(() => {
  //   setSeconds(MAX_SECONDS);
  // }, [answeredQuestionsCount]);

  // Checks if timer should decrease or has reached 0;
  useEffect(() => {
    const isTimerMoreThanZero = seconds > 0;

    let decreaseSeconds;
    if (isTimerMoreThanZero && !isTimerPaused) {
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
    // that does the job but after pausing instantly changes them to 60 which is not great
    if (isTimerPaused) {
      return setSeconds(time);
    }
    return () => clearInterval(decreaseSeconds); // Clear the interval on component unmount or when seconds change
  }, [seconds, isTimerPaused, time]);

  return (
    <div className={styles.timer}>
      <span>{seconds}</span>
    </div>
  );
};

export default Timer;

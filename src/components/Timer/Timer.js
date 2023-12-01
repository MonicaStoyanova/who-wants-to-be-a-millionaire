import styles from "./Timer.module.css";

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

// we will need local state for the seconds,it should restart on question index change
const Timer = () => {
  const [seconds, setSeconds] = useState(60);

  let navigate = useNavigate();

  const answeredQuestions = useSelector(
    (state) => state.gamePlay.answeredQuestions
  );

  useEffect(() => {
    const timer =
      // setInterval is native JSfunction and triggers setSeconds
      // we need clearInterval in order the Timer to work properly
      // everytime the seconds change,new setinterval is called
      seconds > 0 && setInterval(() => setSeconds(seconds - 1), 1000);

    return () => clearInterval(timer);
  }, [seconds]);

  if (seconds === 0) {
    navigate("/gameover");
  }
  // now we need to re-start the seconds from 60 on question index change which we can track with the state of the correct answer count
  useEffect(() => {
    setSeconds(60);
  }, [answeredQuestions]);

  return (
    <div className={styles.timer}>
      <span>{seconds}</span>
    </div>
  );
};

export default Timer;

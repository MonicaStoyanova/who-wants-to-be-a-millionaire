import styles from "./Timer.module.css";

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Timer = () => {
  // we will need local state for the seconds,it should restart on question index change
  const [seconds, setSeconds] = useState(60);

  useEffect(() => {
    const timer =
      // setInterval is native JSfunction and triggers setSeconds
      // we need clearInterval in order the Timer to work properly
      // everytime the seconds change,new setinterval is called
      seconds > 0 && setInterval(() => setSeconds(seconds - 1), 1000);

    return () => clearInterval(timer);
  }, [seconds]);

  let navigate = useNavigate();
  if (seconds === 0) {
    navigate("/gameover");
  }

  // now we need to re-start the seconds from 60 on question index change

  return (
    <div className={styles.timer}>
      <span>{seconds}</span>
    </div>
  );
};

export default Timer;

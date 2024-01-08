import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect, useRef } from "react";

import { MAX_SECONDS } from "utils/constants";
import { useTimer } from "hooks/useTimer";

import styles from "./Timer.module.css";

const Timer = () => {
  const navigate = useNavigate();

  const { gameStage, answeredQuestionsCount } = useSelector(
    (state) => state.gamePlay
  );

  const prevAnsweredQuestionsCountRef = useRef(answeredQuestionsCount);

  const { seconds, pause, reset, running, start, stop } = useTimer({
    initialSeconds: MAX_SECONDS,
  });

  useEffect(() => {
    if (seconds === 0) {
      stop();
      navigate("/gameover");
    }

    if (answeredQuestionsCount > prevAnsweredQuestionsCountRef.current) {
      reset();
    }

    prevAnsweredQuestionsCountRef.current = answeredQuestionsCount;

    if (gameStage === "paused") {
      pause();
    }

    if (gameStage === "running" && !running) {
      start();
    }
  }, [seconds, gameStage, answeredQuestionsCount]);

  return (
    <div className={styles.timer}>
      <span>{seconds}</span>
    </div>
  );
};

export default Timer;

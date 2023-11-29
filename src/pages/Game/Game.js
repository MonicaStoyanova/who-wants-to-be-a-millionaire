import React, { useEffect } from "react";
import styles from "./Game.module.css";
import { fetchQuestionsAndAnswers } from "../../store/Slices/gamePlaySlice";
import { useDispatch, useSelector } from "react-redux";

const Game = () => {
  const dispatch = useDispatch();
  const { categoryId, difficulty } = useSelector((state) => state.gamePlay);

  useEffect(() => {
    // Trigger the fetchQuestionsAndAnswers action with the selected categoryId and difficulty
    dispatch(fetchQuestionsAndAnswers({ categoryId, difficulty }));
  }, []);

  return (
    <div className={styles.background}>
      <div className={styles.question}></div>
      <div className={styles.answers}></div>
    </div>
  );
};

export default Game;

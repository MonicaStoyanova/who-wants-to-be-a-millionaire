import React, { useEffect } from "react";
import styles from "./Game.module.css";
import { fetchQuestionsAndAnswers } from "../../store/Slices/gamePlaySlice";
import { useDispatch, useSelector } from "react-redux";

const Game = () => {
  const dispatch = useDispatch();
  const { categoryId, difficulty } = useSelector((state) => state.gamePlay);
  // when they are consol logged the correct values appear

  useEffect(() => {
    // Fetch the questions data(question itself with answers) when the component mounts
    dispatch(fetchQuestionsAndAnswers({ categoryId, difficulty }));
  }, []);
  const status = useSelector((state) => state.gamePlay.status);
  const questions = useSelector((state) => state.gamePlay.questions);
  const error = useSelector((state) => state.gamePlay.error);

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  if (status === "failed") {
    return <p>Error: {error}</p>;
  }

  return (
    <div className={styles.background}>
      <div className={styles.question}>
        {questions.map((question) => (
          <p key={question.question}>{question.question}</p>
        ))}
      </div>
      <div className={styles.answers}></div>
    </div>
  );
};

export default Game;

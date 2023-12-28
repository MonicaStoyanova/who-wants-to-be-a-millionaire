import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Button from "@mui/joy/Button";

import {
  fetchQuestionsAndAnswers,
  resetGame,
} from "../../store/slices/gamePlaySlice";

import Question from "../../components/Question/Question";
import Answers from "../../components/Answers/Answers";
import Timer from "../../components/Timer/Timer";
import Player from "../../components/Sound/Sound";

import styles from "./Game.module.css";

const Game = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    categoryId,
    difficulty,
    answeredQuestionsCount,
    status,
    questions,
    error,
  } = useSelector((state) => state.gamePlay);

  let currentQuestionIndex = answeredQuestionsCount;

  useEffect(() => {
    dispatch(fetchQuestionsAndAnswers({ categoryId, difficulty }));
  }, []);

  const routeChange = () => {
    dispatch(resetGame());
    const path = "/";
    navigate(path);
  };

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  if (status === "failed") {
    return <p>Error: {error}</p>;
  }

  if (questions.length === 0) {
    return (
      <Button
        className={styles.return}
        onClick={routeChange}
        size="md"
        variant={"soft"}
        color="warning"
      >
        No Questions Found, please select another difficulty or category
      </Button>
      //or do this : alert("No Questions Found, please select another difficulty or category")
    );
  }
  const shuffledAnswers = [
    ...questions[currentQuestionIndex].incorrect_answers,
    questions[currentQuestionIndex].correct_answer,
  ].sort(() => Math.random() - 0.5);

  // TO DO:
  // Implement three extra Joker options: "Call a Friend," "50/50," and "Help from the Audience." Each Joker provides extra points
  return (
    <div className={styles.background}>
      <Player />
      <Timer />
      <div className={styles.gameContainer}>
        <Question
          question={questions[currentQuestionIndex].question}
          currentQuestionIndex={currentQuestionIndex}
        />
        <Answers
          shuffledAnswers={shuffledAnswers}
          correctAnswer={questions[currentQuestionIndex].correct_answer}
        />
      </div>
    </div>
  );
};

export default Game;

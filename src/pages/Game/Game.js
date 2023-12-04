import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "@mui/joy/Button";

import { fetchQuestionsAndAnswers } from "../../store/slices/gamePlaySlice";

import Question from "../../components/Question/Question";
import Answers from "../../components/Answers/Answers";
import Timer from "../../components/Timer/Timer";
import styles from "./Game.module.css";
import { useNavigate } from "react-router-dom";

const Game = () => {
  const dispatch = useDispatch();
  const { categoryId, difficulty, answeredQuestions } = useSelector(
    (state) => state.gamePlay
  );
  let currentQuestionIndex = answeredQuestions;
  let navigate = useNavigate();

  useEffect(() => {
    // Fetch the questions data(question itself with answers) when the component mounts
    dispatch(fetchQuestionsAndAnswers({ categoryId, difficulty }));
  }, []);
  const status = useSelector((state) => state.gamePlay.status);
  // in this variable there is an array of objects containing the question itself,
  // correct and incorrect answers as follows
  // .question-string; .correct_answer-string; .incorrect_answers-which is array with 3 strings
  const questions = useSelector((state) => state.gamePlay.questions);
  const error = useSelector((state) => state.gamePlay.error);

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  if (status === "failed") {
    return <p>Error: {error}</p>;
  }
  const routeChange = () => {
    let path = "/";
    navigate(path);
  };
  if (questions.length === 0) {
    return (
      //relocate the request from here to home
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
  // shuffledAnswers is an array which has array of 3 wrong answers and a string with the correct answer
  const shuffledAnswers = [
    ...questions[currentQuestionIndex].incorrect_answers,
    questions[currentQuestionIndex].correct_answer,
  ].sort(() => Math.random() - 0.5);

  // TO DO:
  // we will need to implement soundtrack handling logic enabled by default
  // Implement three extra Joker options: "Call a Friend," "50/50," and "Help from the Audience." Each Joker provides extra points
  return (
    <div className={styles.background}>
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

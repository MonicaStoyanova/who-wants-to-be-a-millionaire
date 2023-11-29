import React, { useEffect } from "react";

import { fetchQuestionsAndAnswers } from "../../store/Slices/gamePlaySlice";
import { useDispatch, useSelector } from "react-redux";

import { updateUserStatistics } from "../../store/Slices/gamePlaySlice";
import Question from "../../components/Question/Question";
import Answers from "../../components/Answers/Answers";
import styles from "./Game.module.css";

const Game = () => {
  const dispatch = useDispatch();
  const { categoryId, difficulty, answeredQuestions } = useSelector(
    (state) => state.gamePlay
  );
  let currentQuestionIndex = answeredQuestions;

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
  if (questions.length === 0) {
    // let it be a button so when clicked to redirect to home
    return <p>No Questions Found, please different difficulty or category</p>;
  }
  // shuffledAnswers is an array which has array of 3 wrong answers and a string with the correct answer
  const shuffledAnswers = [
    ...questions[currentQuestionIndex].incorrect_answers,
    questions[currentQuestionIndex].correct_answer,
  ].sort(() => Math.random() - 0.5);

  return (
    <div className={styles.background}>
      <Question
        question={questions[currentQuestionIndex].question}
        currentQuestionIndex={currentQuestionIndex}
      />
      <Answers
        shuffledAnswers={shuffledAnswers}
        correctAnswer={questions[currentQuestionIndex].correct_answer}
      />
    </div>
  );
};

export default Game;

// GameContent.js
import React from "react";
import Question from "../../components/Question/Question";
import Answers from "../../components/Answers/Answers";
import Timer from "../../components/Timer/Timer";
import Player from "../../components/Sound/Sound";
import styles from "./Game.module.css";

const GameContent = ({
  currentQuestion,
  answeredQuestionsCount,
  shuffledAnswers,
}) => {
  return (
    <div className={styles.background}>
      <Player />
      <Timer />
      <div className={styles.gameContainer}>
        <Question
          question={currentQuestion.question}
          currentQuestionIndex={answeredQuestionsCount}
        />
        <Answers
          shuffledAnswers={shuffledAnswers}
          correctAnswer={currentQuestion.correct_answer}
        />
      </div>
    </div>
  );
};

export default GameContent;

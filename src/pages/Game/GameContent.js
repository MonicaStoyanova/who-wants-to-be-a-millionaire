import { useEffect, useState } from "react";

import Question from "components/Question/Question";
import Answers from "components/Answers/Answers";
import Timer from "components/Timer/Timer";
import Player from "components/Sound/Sound";
//import RemoveTwoRandomElements from "components/Jokers/50-50";

import styles from "./GameContent.module.css";

const shuffle = (array) => {
  let currentIndex = array.length;
  let randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
};

const GameContent = ({ currentQuestion, answeredQuestionsCount }) => {
  const [shuffledAnswers, setShuffledAnswers] = useState([]);

  // Shuffle the answers whenever the currentQuestion changes
  useEffect(() => {
    if (currentQuestion) {
      const answers = [
        currentQuestion.correct_answer,
        ...currentQuestion.incorrect_answers,
      ];
      setShuffledAnswers(shuffle(answers));
    }
  }, [currentQuestion]);

  return (
    <div className={styles.background}>
      {/* <RemoveTwoRandomElements /> */}
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

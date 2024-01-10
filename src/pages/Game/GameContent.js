import { useEffect, useState } from "react";

import Question from "components/Question/Question";
import Answers from "components/Answers/Answers";
import Timer from "components/Timer/Timer";
import Player from "components/Sound/Sound";
import Jokers from "components/Jokers/Jokers";

import styles from "./GameContent.module.css";
import { useSelector } from "react-redux";

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
  const { fiftyFiftyUsed } = useSelector((state) => state.gamePlay);
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
      <Player />
      <Timer />
      <Jokers />
      <div className={styles.gameContainer}>
        <Question
          question={currentQuestion.question}
          currentQuestionIndex={answeredQuestionsCount}
        />
        <Answers
          shuffledAnswers={shuffledAnswers}
          correctAnswer={currentQuestion.correct_answer}
          currentQuestionIndex={answeredQuestionsCount}
        />
      </div>
    </div>
  );
};

export default GameContent;

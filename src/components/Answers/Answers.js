import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import AnswerItem from "./AnswerItem";

import styles from "./Answers.module.css";

const Answers = ({ shuffledAnswers, correctAnswer, currentQuestionIndex }) => {
  const [isAnswerSelected, setIsAnswerSelected] = useState(false);
  const [displayedAnswers, setDisplayedAnswers] = useState(shuffledAnswers);
  const { fiftyFiftyJoker } = useSelector((state) => state.gamePlay);

  const isFiftyFiftyJokerUsed =
    fiftyFiftyJoker.isUsed &&
    currentQuestionIndex === fiftyFiftyJoker.questionIndex;

  useEffect(() => {
    if (isFiftyFiftyJokerUsed) {
      // Apply 50-50 logic only for the question where it was used
      const incorrectAnswers = shuffledAnswers.filter(
        (a) => a !== correctAnswer
      );
      const randomIncorrect =
        incorrectAnswers[Math.floor(Math.random() * incorrectAnswers.length)];
      shuffledAnswers = [correctAnswer, randomIncorrect];
    }
    setDisplayedAnswers(shuffledAnswers);
  }, [shuffledAnswers, correctAnswer, fiftyFiftyJoker, currentQuestionIndex]);

  return (
    <div className={styles.answersContainer}>
      {displayedAnswers.map((a, i) => (
        <AnswerItem
          key={a}
          possibleAnswers={a}
          index={i}
          correctAnswer={correctAnswer}
          setIsAnswerSelected={setIsAnswerSelected}
          isAnswerSelected={isAnswerSelected}
        />
      ))}
    </div>
  );
};

export default Answers;

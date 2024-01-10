import { useEffect, useState } from "react";
import AnswerItem from "./AnswerItem";

import styles from "./Answers.module.css";
import { useSelector } from "react-redux";

const Answers = ({ shuffledAnswers, correctAnswer, currentQuestionIndex }) => {
  const [isAnswerSelected, setIsAnswerSelected] = useState(false);
  const [displayedAnswers, setDisplayedAnswers] = useState(shuffledAnswers);
  const { fiftyFiftyJoker } = useSelector((state) => state.gamePlay);

  useEffect(() => {
    let answers = shuffledAnswers;
    if (
      fiftyFiftyJoker.used &&
      currentQuestionIndex === fiftyFiftyJoker.questionIndex
    ) {
      // Apply 50-50 logic only for the question where it was used
      const incorrectAnswers = shuffledAnswers.filter(
        (a) => a !== correctAnswer
      );
      const randomIncorrect =
        incorrectAnswers[Math.floor(Math.random() * incorrectAnswers.length)];
      answers = [correctAnswer, randomIncorrect];
    }
    setDisplayedAnswers(answers);
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

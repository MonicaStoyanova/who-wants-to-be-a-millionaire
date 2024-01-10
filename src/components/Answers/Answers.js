import { useState } from "react";
import AnswerItem from "./AnswerItem";

import styles from "./Answers.module.css";

const Answers = ({ shuffledAnswers, correctAnswer, fiftyFiftyUsed }) => {
  const [isAnswerSelected, setIsAnswerSelected] = useState(false);

  let displayedAnswers = shuffledAnswers;
  if (fiftyFiftyUsed) {
    // Keep one random incorrect answer
    const incorrectAnswers = shuffledAnswers.filter((a) => a !== correctAnswer);
    const randomIncorrect =
      incorrectAnswers[Math.floor(Math.random() * incorrectAnswers.length)];
    displayedAnswers = [correctAnswer, randomIncorrect];
  }

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

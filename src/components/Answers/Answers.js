import { useState } from "react";
import AnswerItem from "./AnswerItem";

import styles from "./Answers.module.css";

const Answers = ({ shuffledAnswers, correctAnswer }) => {
  const [isAnswerSelected, setIsAnswerSelected] = useState(false);

  return (
    <div className={styles.answersContainer}>
      {shuffledAnswers.map((a, i) => (
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

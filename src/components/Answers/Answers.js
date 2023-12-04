import styles from "./Answers.module.css";
import { updateUserStatistics } from "../../store/slices/gamePlaySlice";
import { LETTERS } from "../../utils/constants";

import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useState, useEffect } from "react";

const AnswerItem = ({ answer, index, correctAnswer }) => {
  const [answeredQuestion, setAnsweredQuestion] = useState(null);
  const dispatch = useDispatch();
  let navigate = useNavigate();

  useEffect(() => {
    if (answeredQuestion && correctAnswer !== answeredQuestion) {
      navigate("/gameover");
    }
  }, [answeredQuestion]);

  // TO DO:
  // When the user selects an answer, it should start blinking. If the answer is correct, show the answer in green; if incorrect, show it in red and display the correct answer in green simultaneously.
  // If the user answers all 15 questions correctly, redirect them to this screen with the title "CONGRATULATIONS YOU WON 100,000lv." Show a table with the amount they have won.
  return (
    <>
      {correctAnswer === answeredQuestion && (
        <button
          className={styles.nextBtn}
          onClick={() => dispatch(updateUserStatistics())}
        >
          Next
        </button>
      )}
      <button
        className={styles.answerOptions}
        onClick={() => setAnsweredQuestion(answer)}
      >
        <span>{LETTERS[index]}: </span>
        {answer}
      </button>
    </>
  );
};

const Answers = ({ shuffledAnswers, correctAnswer }) => {
  return (
    <div className={styles.answersContainer}>
      {shuffledAnswers.map((a, i) => (
        <AnswerItem
          key={a}
          answer={a}
          index={i}
          correctAnswer={correctAnswer}
        />
      ))}
    </div>
  );
};

export default Answers;

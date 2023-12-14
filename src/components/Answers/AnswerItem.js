import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useState, useEffect } from "react";

import styles from "./Answers.module.css";
import {
  updateUserStatistics,
  updateTimerPause,
} from "../../store/slices/gamePlaySlice";
import { LETTERS } from "../../utils/constants";

const AnswerItem = ({
  answer,
  index,
  correctAnswer,
  setIsAnswerSelected,
  isAnswerSelected,
}) => {
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const pattern = /&[^;]+;/g;
  const modifiedAnswer = answer.replace(pattern, "'");

  // checks if the Game is over
  useEffect(() => {
    const isSelectedAnswerWrong =
      selectedAnswer && correctAnswer !== selectedAnswer;

    if (isSelectedAnswerWrong) {
      navigate("/gameover");
    } else if (!isSelectedAnswerWrong) {
      dispatch(updateTimerPause(true));
    }
  }, [selectedAnswer]);
  // TO DO:
  // When the user selects an answer, it should start blinking. If the answer is correct, show the answer in green; if incorrect, show it in red and display the correct answer in green simultaneously.
  // If the user answers all 15 questions correctly, redirect them to this screen with the title "CONGRATULATIONS YOU WON 100,000lv." Show a table with the amount they have won.
  return (
    <>
      {correctAnswer === selectedAnswer && (
        <button
          className={styles.nextBtn}
          onClick={() => {
            dispatch(updateUserStatistics());
            setIsAnswerSelected(false);
            dispatch(updateTimerPause(false));
          }}
        >
          Next
        </button>
      )}

      <button
        disabled={isAnswerSelected}
        className={styles.answerOptions}
        onClick={() => {
          setIsAnswerSelected(true);
          setSelectedAnswer(modifiedAnswer);
        }}
      >
        <span>{LETTERS[index]}: </span>
        {modifiedAnswer}
      </button>
    </>
  );
};
export default AnswerItem;

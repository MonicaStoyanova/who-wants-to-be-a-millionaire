import { useState } from "react";
import { useDispatch } from "react-redux";

import {
  updateGameStage,
  updateUserStatistics,
} from "../../store/slices/gamePlaySlice";
import { LETTERS, PATTERN } from "../../utils/constants";
import styles from "./Answers.module.css";

// SHIFT + ALT + O
// check on worng answer why it is not navigatoing to end
const AnswerItem = ({
  answer,
  index,
  correctAnswer,
  setIsAnswerSelected,
  isAnswerSelected,
}) => {
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const dispatch = useDispatch();

  const modifiedAnswer = answer.replace(PATTERN, "'");

  return (
    <>
      {correctAnswer === selectedAnswer && (
        <button
          className={styles.nextBtn}
          onClick={() => {
            dispatch(updateUserStatistics());
            dispatch(updateGameStage("running"));
            setIsAnswerSelected(false);
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
          if (correctAnswer === modifiedAnswer) {
            dispatch(updateGameStage("paused"));
          }
        }}
      >
        <span>{LETTERS[index]}: </span>
        {modifiedAnswer}
      </button>
    </>
  );
};
export default AnswerItem;

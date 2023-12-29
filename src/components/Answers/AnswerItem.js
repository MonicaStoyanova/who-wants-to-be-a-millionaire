import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import {
  updateGameStage,
  updateUserStatistics,
} from "../../store/slices/gamePlaySlice";
import { LETTERS, PATTERN } from "../../utils/constants";
import styles from "./Answers.module.css";

const AnswerItem = ({
  possibleAnswers,
  index,
  correctAnswer,
  setIsAnswerSelected,
  isAnswerSelected,
}) => {
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const modifiedAnswers = possibleAnswers.replace(PATTERN, "'");
  const modifiedCorrectAnswer = correctAnswer.replace(PATTERN, "'");

  useEffect(() => {
    const isSelectedAnswerWrong =
      selectedAnswer && modifiedCorrectAnswer !== selectedAnswer;

    if (isSelectedAnswerWrong) {
      navigate("/gameover");
    }
  }, [selectedAnswer, modifiedCorrectAnswer]);

  return (
    <>
      {modifiedCorrectAnswer === selectedAnswer && (
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
          setSelectedAnswer(modifiedAnswers);
          if (modifiedCorrectAnswer === modifiedAnswers) {
            dispatch(updateGameStage("paused"));
          }
        }}
      >
        <span>{LETTERS[index]}: </span>
        {modifiedAnswers}
      </button>
    </>
  );
};
export default AnswerItem;

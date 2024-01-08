import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import {
  updateGameStage,
  updateUserStatistics,
} from "store/slices/gamePlaySlice.js";
import {
  LETTERS,
  REPLACE_FROM_AMPERSAND_TO_SEMICOLON_PATTERN,
} from "utils/constants";

import styles from "./Answers.module.css";

const AnswerItem = ({
  possibleAnswers,
  index,
  correctAnswer,
  setIsAnswerSelected,
  isAnswerSelected,
}) => {
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showNext, setShowNext] = useState(false);
  const [isSuspense, setIsSuspense] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const modifiedAnswers = possibleAnswers.replace(
    REPLACE_FROM_AMPERSAND_TO_SEMICOLON_PATTERN,
    "'"
  );
  const modifiedCorrectAnswer = correctAnswer.replace(
    REPLACE_FROM_AMPERSAND_TO_SEMICOLON_PATTERN,
    "'"
  );

  const answerClass = () => {
    if (isSuspense) return "selected";
    if (!isAnswerSelected) return "";
    if (modifiedAnswers === modifiedCorrectAnswer) return "correct";
    if (modifiedAnswers === selectedAnswer) return "incorrect";
    return "";
  };

  useEffect(() => {
    if (isSuspense) {
      setTimeout(() => {
        setIsSuspense(false);
        setIsAnswerSelected(true);

        const isCorrect = selectedAnswer === modifiedCorrectAnswer;
        const isWrong = selectedAnswer !== modifiedCorrectAnswer;

        if (isCorrect) {
          setTimeout(() => setShowNext(true), 3000);
        }

        if (isWrong) {
          setTimeout(() => navigate("/gameover"), 4000);
        }
      }, 3000);
    }
  }, [selectedAnswer, modifiedCorrectAnswer, isSuspense]);

  const handleAnswerClick = (answer) => {
    setSelectedAnswer(answer);
    setIsSuspense(true); // Trigger suspense
    dispatch(updateGameStage("paused"));
  };

  return (
    <div>
      {showNext && (
        <button
          className={styles.nextBtn}
          onClick={() => {
            dispatch(updateUserStatistics());
            dispatch(updateGameStage("running"));
            setIsAnswerSelected(false);
            setShowNext(false);
          }}
        >
          Next
        </button>
      )}
      {/* Possible answers buttons */}
      <button
        disabled={isAnswerSelected}
        className={`${styles.answerOptions} ${styles[answerClass()]}`}
        onClick={() => handleAnswerClick(modifiedAnswers)}
      >
        <span>{LETTERS[index]}: </span>
        {modifiedAnswers}
      </button>
    </div>
  );
};

export default AnswerItem;

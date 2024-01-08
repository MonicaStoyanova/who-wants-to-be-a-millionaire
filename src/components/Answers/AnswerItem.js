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
  const [answerStatus, setAnswerStatus] = useState({});
  const [showNext, setShowNext] = useState(false);
  const [isSuspense, setIsSuspense] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const modifiedAnswers = possibleAnswers.replace(PATTERN, "'");
  const modifiedCorrectAnswer = correctAnswer.replace(PATTERN, "'");

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
          //  setAnswerStatus({ [selectedAnswer]: "correct" });
          setTimeout(() => setShowNext(true), 3000);
        } else if (isWrong) {
          // setAnswerStatus((prevState) => ({
          //   ...prevState,
          //   [selectedAnswer]: "incorrect",
          // }));
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
            setAnswerStatus({});
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

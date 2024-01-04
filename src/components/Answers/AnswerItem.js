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
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const modifiedAnswers = possibleAnswers.replace(PATTERN, "'");
  const modifiedCorrectAnswer = correctAnswer.replace(PATTERN, "'");

  const answerClass = () => {
    if (!isAnswerSelected) return "";
    if (modifiedAnswers === correctAnswer) return "correct"; // Always mark the correct answer
    if (modifiedAnswers === selectedAnswer) return "incorrect"; // Mark the selected incorrect answer
    return "";
  };

  useEffect(() => {
    if (selectedAnswer !== null) {
      dispatch(updateGameStage("paused"));
      setAnswerStatus({ [correctAnswer]: "correct" });

      setTimeout(() => {
        const isCorrect = selectedAnswer === modifiedCorrectAnswer;
        const isWrong = selectedAnswer !== modifiedCorrectAnswer;

        setAnswerStatus({ [selectedAnswer]: "correct" });
        if (isCorrect) {
          setAnswerStatus({ [selectedAnswer]: "correct" });
          setTimeout(() => setShowNext(true), 3000);
        } else if (isWrong) {
          setAnswerStatus((prevState) => ({
            ...prevState,
            [selectedAnswer]: "incorrect",
          }));
          setTimeout(() => navigate("/gameover"), 5000);
        }
      }, 3000);
    }
  }, [selectedAnswer, modifiedCorrectAnswer, correctAnswer]);

  const handleAnswerClick = (answer) => {
    setIsAnswerSelected(true);
    setSelectedAnswer(answer);
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

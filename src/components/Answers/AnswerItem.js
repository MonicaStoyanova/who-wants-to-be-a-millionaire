import { useState } from "react";
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

  const handleAnswerClick = (answer) => {
    setIsAnswerSelected(true);
    setSelectedAnswer(answer);
    dispatch(updateGameStage("paused")); // Pause the timer immediately after an answer is selected
    setAnswerStatus({ [answer]: "selected" });

    setTimeout(() => {
      const isCorrect = answer === modifiedCorrectAnswer;

      if (isCorrect) {
        setAnswerStatus({ [answer]: "correct" });
        setTimeout(() => {
          setShowNext(true);
        }, 3000);
      } else {
        setAnswerStatus({
          [answer]: "incorrect",
          [modifiedCorrectAnswer]: "correct", // correct answer is marked for blinking BUT NOT WORKING
        });
        setTimeout(() => {
          navigate("/gameover");
        }, 5000); // 5 seconds total (3 seconds suspense + 2 seconds red)
      }
    }, 3000); // 3-second suspense before showing the result
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

      <button
        disabled={isAnswerSelected}
        className={`${styles.answerOptions} ${
          styles[answerStatus[modifiedAnswers]]
        }`}
        onClick={() => handleAnswerClick(modifiedAnswers)}
      >
        <span>{LETTERS[index]}: </span>
        {modifiedAnswers}
      </button>
    </div>
  );
};

export default AnswerItem;

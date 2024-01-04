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
  const [answerStatus, setAnswerStatus] = useState({}); //selected, correct or incorrect
  const [showNext, setShowNext] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // applying RegEx to clear the answers from unwanted elements
  const modifiedAnswers = possibleAnswers.replace(PATTERN, "'");
  const modifiedCorrectAnswer = correctAnswer.replace(PATTERN, "'");

  const handleAnswerClick = (answer) => {
    setIsAnswerSelected(true);
    setSelectedAnswer(answer);
    dispatch(updateGameStage("paused")); // Pause the timer immediately after an answer is selected
    setAnswerStatus({ [answer]: "selected" }); // tried to add here always to blink the correct [correctAnswer]: "correct" DID NOT WORK

    setTimeout(() => {
      const isCorrect = answer === modifiedCorrectAnswer;
      setAnswerStatus({ [answer]: "correct" });
      if (isCorrect) {
        //setAnswerStatus({ [answer]: "correct" });
        setTimeout(() => {
          setShowNext(true);
        }, 3000);
      } else {
        // console.log(Object.values(answerStatus)); returns empty array
        setAnswerStatus((prevState) => ({
          ...prevState,
          [answer]: "incorrect",
        }));
        // HERE IT IS EMPTY
        //console.log(Object.values(answerStatus));
        setTimeout(() => {
          navigate("/gameover");
        }, 5000); // 5 seconds total (3 seconds suspense + 2 seconds red)
      }
    }, 3000); // 3-second suspense before showing the result
  };
  // console.log(answerStatus);
  // it does show that both correct and wrong selection do have proper class attached
  //HERE IT DOES SHOE THE CORRECT VALUES ['incorrect', 'correct']
  //console.log(Object.values(answerStatus));
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

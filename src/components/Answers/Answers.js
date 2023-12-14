import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
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
  //answeredQuestion is not descriptive enough,this is the string value of the answer the user has selected
  const [answeredQuestion, setAnsweredQuestion] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const pattern = /&[^;]+;/g;
  const modifiedAnswer = answer.replace(pattern, "'");
  const isTimerPaused = useSelector((state) => state.gamePlay.isTimerPaused);
  // checks if the Game is over
  // the probleme is here somewhere
  useEffect(() => {
    const isSelectedAnswerWrong =
      answeredQuestion && correctAnswer !== answeredQuestion;

    if (isSelectedAnswerWrong) {
      navigate("/gameover");
    } else if (!isSelectedAnswerWrong) {
      //4. before even selecting it is false; checked;
      //6.  checkes again : false; checked
      //8
      //9
      console.log("timerpaused on selected correct answer?", { isTimerPaused });
      dispatch(updateTimerPause(true));
      //5. it doesnt execute before selected answer still false, checked;
      //7
      //9
      //11
      console.log("does it executes before an answer is even selected??", {
        isTimerPaused,
      });
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
          onClick={() => {
            dispatch(updateUserStatistics());
            setIsAnswerSelected(false);
            console.log("timerpaused before updating it AnswerItem?", {
              isTimerPaused,
            });
            dispatch(updateTimerPause(false));
            console.log("timerpaused after updating it AnswerItem?", {
              isTimerPaused,
            });
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
          setAnsweredQuestion(modifiedAnswer);
        }}
      >
        <span>{LETTERS[index]}: </span>
        {modifiedAnswer}
      </button>
    </>
  );
};

const Answers = ({ shuffledAnswers, correctAnswer }) => {
  const [isAnswerSelected, setIsAnswerSelected] = useState(false);
  const isTimerPaused = useSelector((state) => state.gamePlay.isTimerPaused);
  // 2. it is false; checked
  console.log("timerpaused begining of answer component?", { isTimerPaused });
  return (
    <div className={styles.answersContainer}>
      {shuffledAnswers.map((a, i) => (
        <AnswerItem
          key={a}
          answer={a}
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

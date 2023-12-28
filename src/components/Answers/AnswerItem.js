import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import React, { useState, useEffect, useCallback } from "react";

import styles from "./Answers.module.css";
import { updateUserStatistics } from "../../store/slices/gamePlaySlice";
import { LETTERS } from "../../utils/constants";
import { PATTERN } from "../../utils/constants";
import { useTimer } from "../../hooks/useTimer";

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

  const gameOverHandler = useCallback(() => {
    navigate("/gameover");
  }, []);

  const { pause } = useTimer({
    cb: () => gameOverHandler(),
  });

  const modifiedAnswer = answer.replace(PATTERN, "'");

  console.log(selectedAnswer && correctAnswer === selectedAnswer);

  // // checks if the Game is over or the timer should be paused
  // useEffect(() => {
  //   // for clarity  purposes, two constants are created
  //   const isSelectedAnswerCorrect =
  //     selectedAnswer && correctAnswer === selectedAnswer;

  //   if (isSelectedAnswerCorrect) pause();

  //   // Cleanup function
  //   return () => {
  //     stop();
  //   };
  // }, [selectedAnswer, correctAnswer, pause, stop, seconds]);

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
export default React.memo(AnswerItem);

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import GameContent from "./GameContent";
import AlertMessage from "./AlertMessage";

import {
  fetchQuestionsAndAnswers,
  resetGame,
} from "../../store/slices/gamePlaySlice";

const Game = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    categoryId,
    difficulty,
    answeredQuestionsCount,
    status,
    questions,
    error,
  } = useSelector((state) => state.gamePlay);

  // Fetching questions and answers
  useEffect(() => {
    dispatch(fetchQuestionsAndAnswers({ categoryId, difficulty }));
  }, [categoryId, difficulty, dispatch]);

  const handleModalClose = () => {
    // Perform necessary actions on close
    // For example, resetting the game state or navigating to a different page
    dispatch(resetGame());
    navigate("/");
  };

  let content;
  switch (status) {
    case "loading":
      content = <p>Loading...</p>;
      break;
    case "failed":
      content = <p>Error: {error}</p>;
      break;
    case "succeeded":
      if (questions.length !== 0) {
        const currentQuestion = questions[answeredQuestionsCount];
        const shuffledAnswers = [
          ...currentQuestion.incorrect_answers,
          currentQuestion.correct_answer,
        ].sort(() => Math.random() - 0.5);

        content = (
          <GameContent
            currentQuestion={currentQuestion}
            answeredQuestionsCount={answeredQuestionsCount}
            shuffledAnswers={shuffledAnswers}
          />
        );
      } else {
        content = (
          <AlertMessage
            message="Please select another difficulty or category."
            onClose={handleModalClose}
          />
        );
      }
      break;
    default:
      content = null;
  }

  return content;
};

export default Game;

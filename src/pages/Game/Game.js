import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import AlertMessage from "components/Alert/AlertMessage";
import { GAME_SCREEN_ALERTS } from "utils/constants";
import GameContent from "./GameContent";

import {
  fetchQuestionsAndAnswers,
  updateCorrectAnswer,
  updateIncorrectAnswers,
  resetGame,
} from "store/slices/gamePlaySlice";

const Game = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    status,
    error,
    answeredQuestionsCount,
    difficulty,
    questions,
    categoryId,
  } = useSelector((state) => state.gamePlay);

  useEffect(() => {
    dispatch(fetchQuestionsAndAnswers({ categoryId, difficulty }));
  }, [categoryId, difficulty, dispatch]);

  useEffect(() => {
    if (status === "succeeded" && questions.length !== 0) {
      const currentQuestion = questions[answeredQuestionsCount];
      dispatch(updateCorrectAnswer(currentQuestion.correct_answer));
      dispatch(updateIncorrectAnswers(currentQuestion.incorrect_answers));
    }
  }, [answeredQuestionsCount, questions, status]);

  const handleAlertClose = () => {
    dispatch(resetGame());
    navigate("/");
  };

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  if (status === "failed") {
    return <p>Error: {error}</p>;
  }

  if (status === "succeeded") {
    if (questions.length !== 0) {
      const currentQuestion = questions[answeredQuestionsCount];
      return (
        <GameContent
          currentQuestion={currentQuestion}
          answeredQuestionsCount={answeredQuestionsCount}
        />
      );
    } else {
      return (
        <AlertMessage
          message={GAME_SCREEN_ALERTS.NO_QUESTIONS_MESSAGE}
          title={GAME_SCREEN_ALERTS.NO_QUESTIONS_TITLE}
          onClose={handleAlertClose}
        />
      );
    }
  }

  return null;
};

export default Game;

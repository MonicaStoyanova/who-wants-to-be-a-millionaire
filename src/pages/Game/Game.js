import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import AlertMessage from "../../components/Alert/AlertMessage";
import { GAME_SCREEN_ALERTS } from "../../utils/constants";
import GameContent from "./GameContent";

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

  useEffect(() => {
    dispatch(fetchQuestionsAndAnswers({ categoryId, difficulty }));
  }, [categoryId, difficulty]);

  const handleAlertClose = () => {
    dispatch(resetGame());
    navigate("/");
  };

  const content = () => {
    switch (status) {
      case "loading":
        return <p>Loading...</p>;

      case "failed":
        return <p>Error: {error}</p>;

      case "succeeded":
        if (questions.length !== 0) {
          const currentQuestion = questions[answeredQuestionsCount];
          const shuffledAnswers = [
            ...currentQuestion.incorrect_answers,
            currentQuestion.correct_answer,
          ].sort(() => Math.random() - 0.5);

          return (
            <GameContent
              currentQuestion={currentQuestion}
              answeredQuestionsCount={answeredQuestionsCount}
              shuffledAnswers={shuffledAnswers}
            />
          );
        }
        return (
          <AlertMessage
            message={GAME_SCREEN_ALERTS.NO_QUESTIONS_MESSAGE}
            title={GAME_SCREEN_ALERTS.NO_QUESTIONS_TITLE}
            onClose={handleAlertClose}
          />
        );

      default:
        return null;
    }
  };

  return content();
};
export default Game;

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Button from "@mui/joy/Button";
import Modal from "@mui/joy/Modal";

import {
  fetchQuestionsAndAnswers,
  resetGame,
} from "../../store/slices/gamePlaySlice";

import Question from "../../components/Question/Question";
import Answers from "../../components/Answers/Answers";
import Timer from "../../components/Timer/Timer";
import Player from "../../components/Sound/Sound";
import styles from "./Game.module.css";

const Game = () => {
  const [isModalOpen, setModalOpen] = useState(false);
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

  // Handling modal state
  useEffect(() => {
    if (status === "succeeded" && questions.length === 0) {
      setModalOpen(true);
    } else {
      setModalOpen(false);
    }
  }, [status, questions.length]);

  const handleModalClose = () => {
    setModalOpen(false);
    dispatch(resetGame());
    const path = "/";
    navigate(path);
  };

  const renderGameContent = () => {
    const currentQuestion = questions[answeredQuestionsCount];
    const shuffledAnswers = [
      ...currentQuestion.incorrect_answers,
      currentQuestion.correct_answer,
    ].sort(() => Math.random() - 0.5);

    return (
      <div className={styles.background}>
        <Player />
        <Timer />
        <div className={styles.gameContainer}>
          <Question
            question={currentQuestion.question}
            currentQuestionIndex={answeredQuestionsCount}
          />
          <Answers
            shuffledAnswers={shuffledAnswers}
            correctAnswer={currentQuestion.correct_answer}
          />
        </div>
      </div>
    );
  };

  if (status === "loading") {
    return <p>Loading...</p>;
  } else if (status === "failed") {
    return <p>Error: {error}</p>;
  } else if (status === "succeeded" && questions.length !== 0) {
    return renderGameContent();
  }

  return (
    <Modal open={isModalOpen} onClose={handleModalClose}>
      <div className={styles.modal}>
        <h2 id="modal-title">No Questions Found</h2>
        <p id="modal-description">
          Please select another difficulty or category.
        </p>
        <Button onClick={handleModalClose}>OK</Button>
      </div>
    </Modal>
  );
};

export default Game;

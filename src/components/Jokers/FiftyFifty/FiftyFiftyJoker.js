import { useDispatch, useSelector } from "react-redux";

import {
  updateIncorrectAnswers,
  applyFiftyFifty,
} from "store/slices/gamePlaySlice";

import styles from "./FiftyFiftyJoker.module.css";

const FiftyFiftyJoker = () => {
  const dispatch = useDispatch();

  const {
    correctAnswer,
    incorrectAnswers,
    fiftyFiftyJoker,
    answeredQuestionsCount,
    gameStage,
  } = useSelector((state) => state.gamePlay);

  const allAnswers = [...incorrectAnswers, correctAnswer];
  const handleFiftyFifty = () => {
    //if there is selected answer, the gamestage is not running,
    //we use it to block the jokers if the user has selected an answer
    if (gameStage !== "running") return;
    if (incorrectAnswers.length < allAnswers.length / 2) {
      return;
    }

    let reducedIncorrectAnswers = [...incorrectAnswers]; // incorrectAnswers is read-only, that is why we need a variable to work with it

    for (let i = 0; i < 2; i++) {
      const randomIndex = Math.floor(
        Math.random() * reducedIncorrectAnswers.length
      );
      reducedIncorrectAnswers.splice(randomIndex, 1);
    }

    dispatch(updateIncorrectAnswers(reducedIncorrectAnswers));
    dispatch(
      applyFiftyFifty({ isUsed: true, questionIndex: answeredQuestionsCount })
    );
  };

  return (
    <button
      className={`${styles.fifty} ${
        fiftyFiftyJoker.isUsed ? styles.isUsed : ""
      }`}
      onClick={handleFiftyFifty}
      disabled={fiftyFiftyJoker.isUsed}
    ></button>
  );
};

export default FiftyFiftyJoker;

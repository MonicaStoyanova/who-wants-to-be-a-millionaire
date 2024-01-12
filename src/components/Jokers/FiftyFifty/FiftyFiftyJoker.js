// FiftyFiftyJoker.js
import { useDispatch, useSelector } from "react-redux";

import {
  updateIncorrectAnswers,
  applyFiftyFifty,
} from "store/slices/gamePlaySlice";

import styles from "./FiftyFiftyJoker.module.css";

const FiftyFiftyJoker = () => {
  const dispatch = useDispatch();
  const { incorrectAnswers, fiftyFiftyJoker, answeredQuestionsCount } =
    useSelector((state) => state.gamePlay);

  const handleFiftyFifty = () => {
    if (incorrectAnswers.length < 2) {
      return;
    }

    let reducedIncorrectAnswers = [...incorrectAnswers];
    for (let i = 0; i < 2; i++) {
      const randomIndex = Math.floor(
        Math.random() * reducedIncorrectAnswers.length
      );
      reducedIncorrectAnswers.splice(randomIndex, 1);
    }

    dispatch(updateIncorrectAnswers(reducedIncorrectAnswers));
    dispatch(
      applyFiftyFifty({ used: true, questionIndex: answeredQuestionsCount })
    );
  };

  return (
    <button
      className={`${styles.fifty} ${fiftyFiftyJoker.used ? styles.used : ""}`}
      onClick={handleFiftyFifty}
      disabled={fiftyFiftyJoker.used}
    ></button>
  );
};

export default FiftyFiftyJoker;

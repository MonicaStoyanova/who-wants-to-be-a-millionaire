import { useDispatch, useSelector } from "react-redux";

import {
  applyFiftyFifty,
  updateIncorrectAnswers,
} from "store/slices/gamePlaySlice";

import styles from "./Jokers.module.css";

const Jokers = () => {
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

  // TO DO:
  const handleAudienceHelp = () => {};

  const handleCallFriend = () => {};

  return (
    <div className={styles.jokers}>
      <button
        className={`${styles.fifty} ${fiftyFiftyJoker.used ? styles.used : ""}`}
        onClick={handleFiftyFifty}
        disabled={fiftyFiftyJoker.used}
      ></button>
      <button className={styles.audience} onClick={handleAudienceHelp}></button>
      <button className={styles.call} onClick={handleCallFriend}></button>
    </div>
  );
};

export default Jokers;

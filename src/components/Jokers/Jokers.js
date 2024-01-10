import { Button } from "@mui/joy";
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
    // take a look how Buttons color is coming from MUI as blue, i need it transparent
    // fix w & h; p & m
    // once used we need to have them crossed
    <div className={styles.jokers}>
      <Button
        className={styles.fifty}
        onClick={handleFiftyFifty}
        disabled={fiftyFiftyJoker.used}
      ></Button>
      <Button className={styles.audience} onClick={handleAudienceHelp}></Button>
      <Button className={styles.call} onClick={handleCallFriend}></Button>
    </div>
  );
};

export default Jokers;

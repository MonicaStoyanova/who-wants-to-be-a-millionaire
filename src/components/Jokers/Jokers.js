import { Button } from "@mui/joy";
import { useDispatch, useSelector } from "react-redux";
import { updateIncorrectAnswers } from "store/slices/gamePlaySlice";
import styles from "./Jokers.module.css";
import { applyFiftyFifty } from "store/slices/gamePlaySlice";

const Jokers = () => {
  const dispatch = useDispatch();
  const { incorrectAnswers } = useSelector((state) => state.gamePlay);

  const handleFiftyFifty = () => {
    // have to advise AnswerItem to use those if selected
    // have to track if the joker is used; can it be as object with keys the names and boolean values?
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
    dispatch(applyFiftyFifty(true));
  };

  // TO DO:
  const handleAudienceHelp = () => {};

  const handleCallFriend = () => {};

  return (
    // take a look how Buttons color is coming from MUI as blue, i need it transparent
    // fix w & h; p & m
    // once used we need to have them crossed
    <div className={styles.jokers}>
      <Button className={styles.fifty} onClick={handleFiftyFifty}></Button>
      <Button className={styles.audience} onClick={handleAudienceHelp}></Button>
      <Button className={styles.call} onClick={handleCallFriend}></Button>
    </div>
  );
};

export default Jokers;

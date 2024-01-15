//When the lifeline is used, display a mock phone call screen.
import { useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { applyCallFriend } from "store/slices/gamePlaySlice";

import { REPLACE_FROM_AMPERSAND_TO_SEMICOLON_PATTERN } from "utils/constants";
import styles from "./CallFriendJoker.module.css";

const CallFriendJoker = () => {
  const dispatch = useDispatch();
  const { correctAnswer, callFriendJoker } = useSelector(
    (state) => state.gamePlay
  );
  const [showSpeechBubble, setShowSpeechBubble] = useState(false);

  const modifiedCorrectAnswer = correctAnswer.replace(
    REPLACE_FROM_AMPERSAND_TO_SEMICOLON_PATTERN,
    "'"
  );

  const handleCallFriend = () => {
    dispatch(applyCallFriend({ used: true }));
    setShowSpeechBubble(true);

    setTimeout(() => {
      setShowSpeechBubble(false);
    }, 150000);
  };

  return (
    <>
      <button
        className={`${styles.call} ${callFriendJoker.used ? styles.used : ""}`}
        onClick={handleCallFriend}
        disabled={callFriendJoker.used}
      ></button>
      {showSpeechBubble && (
        <blockquote className={styles.ovalThought}>
          <p>
            {"Hmmm...I think the answer is " +
              modifiedCorrectAnswer +
              " Good luck!" +
              "\u{1F340}"}
          </p>
        </blockquote>
      )}
    </>
  );
};

export default CallFriendJoker;

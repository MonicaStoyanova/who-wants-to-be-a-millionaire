import { useState } from "react";

import { useDispatch, useSelector } from "react-redux";

import { applyCallFriend } from "store/slices/gamePlaySlice";

import {
  CLOVER_EMOJI,
  FRIEND_THINKING,
  FRIEND_WHISHING_GOOD_LUCK,
  REPLACE_FROM_AMPERSAND_TO_SEMICOLON_PATTERN,
} from "utils/constants";

import styles from "./CallFriendJoker.module.css";

const CallFriendJoker = () => {
  const dispatch = useDispatch();
  const { correctAnswer, callFriendJoker, gameStage } = useSelector(
    (state) => state.gamePlay
  );
  const [isSpeechBubbleVisible, setIsSpeechBubbleVisible] = useState(false);

  const modifiedCorrectAnswer = correctAnswer.replace(
    REPLACE_FROM_AMPERSAND_TO_SEMICOLON_PATTERN,
    "'"
  );

  const friendAdvice =
    FRIEND_THINKING +
    modifiedCorrectAnswer +
    FRIEND_WHISHING_GOOD_LUCK +
    CLOVER_EMOJI;

  const handleCallFriend = () => {
    //if there is selected answer, the gamestage is not running,
    //we use it to block the jokers if the user has selected an answer
    if (gameStage !== "running") return;

    dispatch(applyCallFriend({ used: true }));
    setIsSpeechBubbleVisible(true);

    setTimeout(() => {
      setIsSpeechBubbleVisible(false);
    }, 15000);
  };

  return (
    <>
      <button
        className={`${styles.call} ${callFriendJoker.used ? styles.used : ""}`}
        onClick={handleCallFriend}
        disabled={callFriendJoker.used}
      ></button>
      {isSpeechBubbleVisible && (
        <blockquote className={styles.ovalThought}>
          <p>{friendAdvice}</p>
        </blockquote>
      )}
    </>
  );
};

export default CallFriendJoker;

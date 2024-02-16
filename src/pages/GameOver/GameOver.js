import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import useWindowSize from "react-use/lib/useWindowSize";
import Confetti from "react-confetti";

import { QUESTIONS_COUNT, REWARDS } from "utils/constants";
import { formatNumber } from "utils/helpers";
import { resetGame } from "store/slices/gamePlaySlice";

import styles from "./GameOver.module.css";

const GameOver = () => {
  const { width, height } = useWindowSize();
  const currentQuestionIndex = useSelector(
    (state) => state.gamePlay.answeredQuestionsCount
  );

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const routeChange = () => {
    const path = "/";
    dispatch(resetGame());
    navigate(path);
  };

  return (
    <div className={styles.endBackground}>
      <div className={styles.endViewContainer}>
        {currentQuestionIndex === QUESTIONS_COUNT ? (
          <>
            <Confetti width={width} height={height} />
            <h1 className={styles.win}>CONGRATULATIONS YOU WON 100,000lv.</h1>
          </>
        ) : (
          <div className={styles.endViewText}>
            <h1>End of the game!</h1>
            <h2>Submitted wrong answer or timed out.</h2>
            <h3>Answered questions: {currentQuestionIndex}</h3>
          </div>
        )}

        <div className={styles.endViewPoints}>
          <ul>
            {Object.entries(REWARDS)
              .reverse()
              .map(([position, price]) => {
                return (
                  <li
                    key={position}
                    className={`${
                      position % 5 === 0 ? styles.listItemWhite : ""
                    }
                   ${currentQuestionIndex === position ? styles.won : ""}
                  `}
                  >
                    {position}: {formatNumber(price)}
                  </li>
                );
              })}
          </ul>
        </div>
        <button className={styles.playagainBtn} onClick={routeChange}>
          Play Again
        </button>
      </div>
    </div>
  );
};

export default GameOver;

import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import styles from "./GameOver.module.css";
import { REWARDS } from "utils/constants";
import { formatNumber } from "utils/projectUtils";
import { resetGame } from "store/slices/gamePlaySlice";

const GameOver = () => {
  const { answeredQuestionsCount } = useSelector((state) => state.gamePlay);
  let currentQuestionIndex = answeredQuestionsCount;

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
        {/* the check if user has answered last question correctly is not working as expected */}
        {currentQuestionIndex === 14 ? (
          <div>Won</div>
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
                   ${currentQuestionIndex == position ? styles.won : ""}
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

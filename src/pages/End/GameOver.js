import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import styles from "./GameOver.module.css";

const rewards = {
  15: " 100 000",
  14: "50 000",
  13: "30 000",
  12: "20 000",
  11: "10 000",
  10: "5 000",
  9: "3 000",
  8: "2 000",
  7: "1 500",
  6: "1 000",
  5: "500",
  4: "400",
  3: "300",
  2: "200",
  1: "100",
};

const GameOver = () => {
  const { answeredQuestions } = useSelector((state) => state.gamePlay);
  let currentQuestionIndex = answeredQuestions;

  let navigate = useNavigate();

  const routeChange = () => {
    let path = "/";
    // make the current question index be 0
    navigate(path);
  };

  return (
    <div className={styles.endBackground}>
      <div className={styles.endViewContainer}>
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
            {Object.entries(rewards)
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
                    {position}: {price}
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

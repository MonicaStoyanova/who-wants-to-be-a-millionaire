import styles from "./Answers.module.css";
import { updateUserStatistics } from "../../store/Slices/gamePlaySlice";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

const AnswerItem = ({ answer, index, correctAnswer }) => {
  const letters = ["A", "B", "C", "D"];

  const dispatch = useDispatch();
  let navigate = useNavigate();

  const isCorrectAnswer = (answer) => {
    if (!(correctAnswer === answer)) {
      navigate("/gameover");
    } else {
      dispatch(updateUserStatistics());
    }
  };
  // TO DO:
  // When the user selects an answer, it should start blinking. If the answer is correct, show the answer in green; if incorrect, show it in red and display the correct answer in green simultaneously.
  // If the user answers all 15 questions correctly, redirect them to this screen with the title "CONGRATULATIONS YOU WON 100,000lv." Show a table with the amount they have won.
  return (
    <button
      className={styles.answerOptions}
      onClick={() => isCorrectAnswer(answer)}
    >
      <span>{letters[index]}: </span>
      {answer}
    </button>
  );
};

const Answers = ({ shuffledAnswers, correctAnswer }) => {
  return (
    <div className={styles.answersContainer}>
      {shuffledAnswers.map((a, i) => (
        <AnswerItem
          key={a}
          answer={a}
          index={i}
          correctAnswer={correctAnswer}
        />
      ))}
    </div>
  );
};

export default Answers;

import styles from "./Answers.module.css";
import { updateUserStatistics } from "../../store/Slices/gamePlaySlice";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

const AnswerItem = ({ answer, index, correctAnswer }) => {
  const letters = ["A", "B", "C", "D"];

  const dispatch = useDispatch();
  let navigate = useNavigate();

  // those two line were used in order to check if the value updates
  // const answeredQuestions = useSelector(
  //   (state) => state.gamePlay.answeredQuestions
  // );

  const isCorrectAnswer = (answer) => {
    if (!(correctAnswer === answer)) {
      navigate("/gameover");
    } else {
      dispatch(updateUserStatistics());
    }
  };
  // console.log(answeredQuestions);
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

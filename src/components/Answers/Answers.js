import styles from "./Answers.module.css";

const AnswerItem = ({ answer, index, correctAnswer }) => {
  const letters = ["A", "B", "C", "D"];

  const isCorrectAnswer = (answer) => {
    if (!(correctAnswer === answer)) {
    }
  };

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

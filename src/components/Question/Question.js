import styles from "./Question.module.css";

const Question = ({ question, currentQuestionIndex }) => {
  return (
    <div className={styles.question}>
      <h1>
        <span>{currentQuestionIndex + 1}. </span>
        {question}
      </h1>
    </div>
  );
};

export default Question;

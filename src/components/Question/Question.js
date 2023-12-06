import styles from "./Question.module.css";

const Question = ({ question, currentQuestionIndex }) => {
  let pattern = /&[^;]+;/g;
  let modifiedQuestion = question.replace(pattern, "'");

  return (
    <div className={styles.question}>
      <h1>
        <span>{currentQuestionIndex + 1}. </span>
        {modifiedQuestion}
      </h1>
    </div>
  );
};

export default Question;

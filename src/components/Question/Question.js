import { REPLACE_FROM_AMPERSAND_TO_SEMICOLON_PATTERN } from "utils/constants";
import styles from "./Question.module.css";

const Question = ({ question, currentQuestionIndex }) => {
  let modifiedQuestion = question.replace(
    REPLACE_FROM_AMPERSAND_TO_SEMICOLON_PATTERN,
    "'"
  );

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

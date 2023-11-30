import styles from "./Next.module.css";
import { useSelector } from "react-redux";

const Next = () => {
  const nextQuestion = useSelector(
    (state) => state.gamePlay.answeredQuestions - 1
  );

  return (
    <button className={styles.next} onClick={() => nextQuestion}>
      Next
    </button>
  );
};

export default Next;

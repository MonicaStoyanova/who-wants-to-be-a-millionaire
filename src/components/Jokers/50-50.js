import { useDispatch, useSelector } from "react-redux";
import styles from "./50-50.module.css";
import { Button } from "@mui/joy";
import { updateIncorrectAnswers } from "store/slices/gamePlaySlice";

/*1. **50:50 Lifeline**: This lifeline eliminates two incorrect answers, 
leaving the contestant with a 50/50 choice between the remaining two.

   **Implementation**: When this lifeline is used, 
   randomly select two incorrect answers and remove them from the display. 
   Ensure that the logic to select these answers is fair and random.

   Q & A is fetched from the slice and the result is used in GAme.js
*/
const handleButtonClick = () => {
  RemoveTwoRandomElements();
};
const RemoveTwoRandomElements = () => {
  const { incorrectAnswers } = useSelector((state) => state.gamePlay);
  const dispatch = useDispatch();
  // Ensure the array has at least two elements
  if (incorrectAnswers.length < 2) {
    return incorrectAnswers;
  }

  // Create a copy of the array to avoid mutating the original array
  let reducedIncorrectAnswers = [...incorrectAnswers];

  // Remove two random elements
  for (let i = 0; i < 2; i++) {
    const randomIndex = Math.floor(
      Math.random() * reducedIncorrectAnswers.length
    );
    reducedIncorrectAnswers.splice(randomIndex, 1);
  }
  dispatch(updateIncorrectAnswers(reducedIncorrectAnswers));

  return (
    // button is displaying but fnc `onClick` listener to be a function, instead got a value of `object` type.
    <div className={styles.jokers}>
      <Button className={styles.fifty} onClick={handleButtonClick}></Button>
    </div>
  );
};

export default RemoveTwoRandomElements;

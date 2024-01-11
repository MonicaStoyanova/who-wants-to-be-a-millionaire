import { useDispatch, useSelector } from "react-redux";

import {
  applyFiftyFifty,
  updateIncorrectAnswers,
} from "store/slices/gamePlaySlice";

import { NUMBER_OF_PARTICIPANTS } from "utils/constants";

import styles from "./Jokers.module.css";

const Jokers = () => {
  const dispatch = useDispatch();

  const {
    correctAnswer,
    incorrectAnswers,
    fiftyFiftyJoker,
    answeredQuestionsCount,
  } = useSelector((state) => state.gamePlay);

  // 50-50
  const handleFiftyFifty = () => {
    if (incorrectAnswers.length < 2) {
      return;
    }

    let reducedIncorrectAnswers = [...incorrectAnswers];
    for (let i = 0; i < 2; i++) {
      const randomIndex = Math.floor(
        Math.random() * reducedIncorrectAnswers.length
      );
      reducedIncorrectAnswers.splice(randomIndex, 1);
    }

    dispatch(updateIncorrectAnswers(reducedIncorrectAnswers));
    dispatch(
      applyFiftyFifty({ used: true, questionIndex: answeredQuestionsCount })
    );
  };

  const handleAudienceHelp = () => {
    // AUDIENCE
    const allAnswers = [...incorrectAnswers, correctAnswer];

    const quizResponses = Array.from(
      // answer from each person
      { length: NUMBER_OF_PARTICIPANTS },
      (_, index) => {
        const randomAnswerIndex = Math.floor(Math.random() * allAnswers.length);

        const givenAnswer = () => {
          if (index % 3 === 0) {
            //every 3rd person gives the correct answer
            return correctAnswer;
          }
          return allAnswers[randomAnswerIndex];
        };

        return {
          answer: givenAnswer(),
        };
      }
    );
    const audienceStatistics = quizResponses.reduce((acc, cur) => {
      //calculates the audience statistics based on the quiz responses
      acc[cur.answer] = acc[cur.answer] + 1 || 1; //If the answer is encountered for the first time, it initializes the count to 1
      return acc;
    }, {});

    const sortedAudienceStatistics = Object.keys(audienceStatistics) //sorts the audience statistics alphabetically based on the answer choices
      .sort()
      .reduce((acc, key) => {
        acc[key] = audienceStatistics[key];
        return acc;
      }, {});
    //console.log(sortedAudienceStatistics);
    /*console.log(sortedAudienceStatistics);
    it returns object like that: 
    {Aries: 10, Capricorn: 21, Libra: 57, Sagittarius: 12}*/
  };

  const handleCallFriend = () => {};

  return (
    <>
      <div className={styles.jokers}>
        <button
          className={`${styles.fifty} ${
            fiftyFiftyJoker.used ? styles.used : ""
          }`}
          onClick={handleFiftyFifty}
          disabled={fiftyFiftyJoker.used}
        ></button>
        <button
          className={styles.audience}
          onClick={handleAudienceHelp}
        ></button>
        <button className={styles.call} onClick={handleCallFriend}></button>
      </div>
    </>
  );
};

export default Jokers;

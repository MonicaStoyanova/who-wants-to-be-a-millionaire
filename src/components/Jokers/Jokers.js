import { useDispatch, useSelector } from "react-redux";

import {
  applyFiftyFifty,
  applyAudienceHelp,
  updateIncorrectAnswers,
} from "store/slices/gamePlaySlice";

import { NUMBER_OF_PARTICIPANTS } from "utils/constants";

import styles from "./Jokers.module.css";
import { Bar } from "react-chartjs-2";
import Chart from "chart.js/auto";
import { useState } from "react";
import "chartjs-plugin-datalabels";
import Modal from "components/Modal/Modal";

const Jokers = () => {
  const dispatch = useDispatch();

  const {
    correctAnswer,
    incorrectAnswers,
    fiftyFiftyJoker,
    audienceHelpJoker,
    answeredQuestionsCount,
  } = useSelector((state) => state.gamePlay);
  const [audienceChartData, setAudienceChartData] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);

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
    if (audienceHelpJoker.used) {
      return;
    }
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
    setAudienceChartData({
      labels: Object.keys(sortedAudienceStatistics),
      datasets: [
        {
          label: "Audience Votes",
          data: Object.values(sortedAudienceStatistics),
          backgroundColor: "rgba(213, 184, 255)",
        },
      ],
    });
    setIsModalOpen(true);
    dispatch(
      applyAudienceHelp({ used: true, questionIndex: answeredQuestionsCount })
    );
  };

  const chartOptions = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
      },
    },
    plugins: {
      datalabels: {
        display: true,
        color: "red",
        font: {
          weight: "bold",
        },
        formatter: (value, context) => {
          return `${context.chart.data.labels[context.dataIndex]}: ${value}`;
        },
      },
    },
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
          className={`${styles.audience} ${
            audienceHelpJoker.used ? styles.used : ""
          }`}
          onClick={handleAudienceHelp}
          disabled={audienceHelpJoker.used}
        ></button>
        <button className={styles.call} onClick={handleCallFriend}></button>
      </div>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <div className={styles.chartContainer}>
          {audienceChartData.labels && (
            <Bar
              // className={styles.chartContainer}
              data={audienceChartData}
              options={chartOptions}
            />
          )}
        </div>
      </Modal>
    </>
  );
};

export default Jokers;

// AudienceHelpJoker.js
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Chart from "chart.js/auto";
import { Bar } from "react-chartjs-2";
import "chartjs-plugin-datalabels";

import { NUMBER_OF_PARTICIPANTS } from "utils/constants";
import { applyAudienceHelp } from "store/slices/gamePlaySlice";

import Modal from "components/Modal/Modal";

import styles from "./AudienceHelpJoker.module.css";

const AudienceHelpJoker = () => {
  const dispatch = useDispatch();
  const {
    correctAnswer,
    incorrectAnswers,
    audienceHelpJoker,
    answeredQuestionsCount,
  } = useSelector((state) => state.gamePlay);
  const [audienceChartData, setAudienceChartData] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAudienceHelp = () => {
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

  return (
    <>
      <button
        className={`${styles.audience} ${
          audienceHelpJoker.used ? styles.used : ""
        }`}
        onClick={handleAudienceHelp}
        disabled={audienceHelpJoker.used}
      ></button>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <div className={styles.chartContainer}>
          {audienceChartData.labels && (
            <Bar data={audienceChartData} options={chartOptions} />
          )}
        </div>
      </Modal>
    </>
  );
};

export default AudienceHelpJoker;

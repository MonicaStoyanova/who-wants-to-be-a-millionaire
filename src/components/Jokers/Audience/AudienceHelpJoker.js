import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import Chart from "chart.js/auto"; // This import is needed for the chart to work properly
import { Bar } from "react-chartjs-2";
import "chartjs-plugin-datalabels";

import {
  MAX_PERCENTAGE,
  CHART_OPTIONS,
  REPLACE_FROM_AMPERSAND_TO_SEMICOLON_PATTERN,
} from "utils/constants";
import {
  generateQuizResponses,
  calculateAudienceStatistics,
  prepareChartData,
} from "utils/helpers";
import { applyAudienceHelp } from "store/slices/gamePlaySlice";

import Modal from "components/Modal/Modal";

import styles from "./AudienceHelpJoker.module.css";

const AudienceHelpJoker = () => {
  const dispatch = useDispatch();
  const { correctAnswer, incorrectAnswers, audienceHelpJoker, gameStage } =
    useSelector((state) => state.gamePlay);

  const [audienceChartData, setAudienceChartData] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAudienceHelp = () => {
    if (audienceHelpJoker.used) {
      return;
    }
    //if there is selected answer, the gamestage is not running,
    //we use it to block the jokers if the user has selected an answer
    if (gameStage !== "running") return;

    //Cleaning the answers from elements before populating the chart
    const modifiedIncorrectAnswers = incorrectAnswers.map((answer) =>
      answer.replace(REPLACE_FROM_AMPERSAND_TO_SEMICOLON_PATTERN, "'")
    );
    const modifiedCorrectAnswer = correctAnswer.replace(
      REPLACE_FROM_AMPERSAND_TO_SEMICOLON_PATTERN,
      "'"
    );

    const allAnswers = [...modifiedIncorrectAnswers, modifiedCorrectAnswer];

    const quizResponses = generateQuizResponses(
      allAnswers,
      correctAnswer,
      MAX_PERCENTAGE
    );
    const audienceStatistics = calculateAudienceStatistics(quizResponses);

    const chartData = prepareChartData(audienceStatistics);
    setAudienceChartData(chartData);

    setIsModalOpen(true);
    dispatch(applyAudienceHelp({ used: true }));
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
            <Bar data={audienceChartData} options={CHART_OPTIONS} />
          )}
        </div>
      </Modal>
    </>
  );
};

export default AudienceHelpJoker;

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import Chart from "chart.js/auto"; // This import is needed for the chart to work properly
import { Bar } from "react-chartjs-2";
import "chartjs-plugin-datalabels";

import { MAX_PERCENTAGE, CHART_OPTIONS } from "utils/constants";
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
  const { correctAnswer, incorrectAnswers, audienceHelpJoker } = useSelector(
    (state) => state.gamePlay
  );

  const [audienceChartData, setAudienceChartData] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAudienceHelp = () => {
    if (audienceHelpJoker.used) {
      return;
    }

    const allAnswers = [...incorrectAnswers, correctAnswer];

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

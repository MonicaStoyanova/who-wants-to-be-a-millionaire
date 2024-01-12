import Chart from "chart.js/auto"; // This import is needed for the chart to work properly
import { Bar } from "react-chartjs-2";
import "chartjs-plugin-datalabels";

const AudienceChart = ({ data, options }) => {
  return <Bar data={data} options={options} />;
};

export default AudienceChart;

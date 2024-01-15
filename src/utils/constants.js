export const LETTERS = ["A", "B", "C", "D"];

export const REWARDS = {
  15: "100000",
  14: "50000",
  13: "30000",
  12: "20000",
  11: "10000",
  10: "5000",
  9: "3000",
  8: "2000",
  7: "1500",
  6: "1000",
  5: "500",
  4: "400",
  3: "300",
  2: "200",
  1: "100",
};

export const GAME_SCREEN_ALERTS = {
  NO_QUESTIONS_TITLE: "No Questions Found",
  NO_QUESTIONS_MESSAGE: "Please select another difficulty or category.",
};
export const MAX_SECONDS = 60;

export const REPLACE_FROM_AMPERSAND_TO_SEMICOLON_PATTERN = /&[^;]+;/g;

export const MAX_PERCENTAGE = 100;

export const CHART_OPTIONS = {
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
export const QUESTIONS_COUNT = 15;
export const FRIEND_THINKING = "Hmmm...I think the answer is: ";
export const FRIEND_WHISHING_GOOD_LUCK = ". Good luck!";
export const CLOVER_EMOJI = "\u{1F340}";

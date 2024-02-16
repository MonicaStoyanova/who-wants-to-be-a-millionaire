// formatting function to insert spaces between every 3 characters counting from the last towards the first

export function formatNumber(number) {
  const numStr = number.toString();

  const beforeDecimal = numStr.slice(0, -3);
  const afterDecimal = numStr.slice(-3);

  const formattedNumber = beforeDecimal + " " + afterDecimal;

  return formattedNumber;
}

// Generate quiz responses and calculate audience statistics
export const generateQuizResponses = (
  allAnswers,
  correctAnswer,
  MAX_PERCENTAGE
) => {
  return Array.from({ length: MAX_PERCENTAGE }, (_, index) => {
    const randomAnswerIndex = Math.floor(Math.random() * allAnswers.length);

    const givenAnswer = () => {
      //every 3rd person gives the correct answer
      if (index % 3 === 0) {
        return correctAnswer;
      }
      return allAnswers[randomAnswerIndex];
    };

    return {
      answer: givenAnswer(),
    };
  });
};

//calculates the audience statistics based on the quiz responses
export const calculateAudienceStatistics = (quizResponses) => {
  return quizResponses.reduce((acc, cur) => {
    acc[cur.answer] = acc[cur.answer] + 1 || 1; //If the answer is encountered for the first time, it sets the count to 1
    return acc;
  }, {});
};

export const prepareChartData = (audienceStatistics) => {
  const sortedAudienceStatistics = Object.keys(audienceStatistics)
    .sort()
    .reduce((acc, key) => {
      acc[key] = audienceStatistics[key];
      return acc;
    }, {});

  return {
    labels: Object.keys(sortedAudienceStatistics),
    datasets: [
      {
        label: "Audience Votes",
        data: Object.values(sortedAudienceStatistics),
        backgroundColor: "rgba(213, 184, 255)",
      },
    ],
  };
};

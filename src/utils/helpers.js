// formatting function to insert spaces between every 3 characters counting from the last towards the first

export function formatNumber(number) {
  const numStr = number.toString();

  const beforeDecimal = numStr.slice(0, -3);
  const afterDecimal = numStr.slice(-3);

  const formattedNumber = beforeDecimal + " " + afterDecimal;

  return formattedNumber;
}

// formatting function to insert spaces between every 3 characters counting from the last towards the first

export function formatNumber(number) {
  let numStr = number.toString();

  let beforeDecimal = numStr.slice(0, -3);
  let afterDecimal = numStr.slice(-3);

  let formattedNumber = beforeDecimal + " " + afterDecimal;

  return formattedNumber;
}

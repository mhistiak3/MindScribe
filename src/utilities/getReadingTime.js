/*
 * Title: getReadingTime()
 * Description:  Calculate the reding time for given text
 * Author: Istiak Ahammad 
 * Date: 8/20/2024
 *
 */
const AVQ_READ_WPM = 200
const getReadingTime = (text) =>
  Math.ceil(text.split(" ").length / AVQ_READ_WPM);

module.exports = getReadingTime;
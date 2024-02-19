const fs = require('fs');

const readInput = (argumentArray, expectedLength) => {
  if (argumentArray.length !== expectedLength) {
    throw new Error('Please provide one valid path to a CSV file');
  } else if (!fs.existsSync(argumentArray[2])) {
    throw new Error('The provided path does not exist');
  } else {
    return argumentArray[2];
  }
};

const generateChartConfig = (colors, datasets) => {
  /* make colors an object with color as key and hex code as value */
  /* include grey. then use colors['grey'] etc. */
  /* for array type stuff you can do arr = ['pink', 'blue'] then colors[arr[i]] etc*/
  /* should figure out a way to get that x label in… */
};

/* 
  * should probably have some x data validation
  * y can handle string gracefully… not so much x
  * and we also need to parse x as date vs. x as number
  * */

module.exports = {
  readInput,
};

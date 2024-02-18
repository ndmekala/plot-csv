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

module.exports = {
  readInput,
};

const fs = require('fs');

const validateInput = (argument) => {
  if (!argument) {
    console.error('Please provide a valid path to the CSV file');
    process.exit(1);
  } else if (!fs.existsSync(argument)) {
    console.error('The provided path does not exist');
    process.exit(1);
  } else {
    return argument
  }
};

module.exports = {
  validateInput
}

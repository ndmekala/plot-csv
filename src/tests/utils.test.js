const fs = require('fs');
const { readInput } = require('../utils');

describe('readInput function', () => {
  const argumentArrayLength = 3;

  it('should return the argument if it exists and is a valid path', () => {
    const argumentsArray = ['', '', './src/sample.csv'];
    const result = readInput(argumentsArray, argumentArrayLength);
    expect(result).toBe(argumentsArray[2]);
  });

  it('should throw an error if too few arguments provided', () => {
    expect(() => readInput(['', ''], argumentArrayLength)).toThrow('Please provide one valid path to a CSV file');
  });

  it('should throw an error if too many arguments provided', () => {
    expect(() => readInput(['', '', './src/sample.csv', ''], argumentArrayLength)).toThrow('Please provide one valid path to a CSV file');
  });

  it('should log an error message and exit the process if the argument is not a valid path', () => {
    expect(() => readInput(['', '', 'nonExistingFile.csv'], argumentArrayLength)).toThrow('The provided path does not exist');
  });
});

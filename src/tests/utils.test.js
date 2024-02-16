const fs = require('fs');
const { validateInput } = require('../utils');

describe('validateInput function', () => {
  it('should return the argument if it exists and is a valid path', () => {
    const existingFilePath = './src/sample.csv';
    const result = validateInput(existingFilePath);

    expect(result).toBe(existingFilePath);
  });

  it('should log an error message and exit the process if the argument is not provided', () => {
    const consoleSpy = jest
      .spyOn(console, 'error')
      .mockImplementation(() => {});
    const processExitSpy = jest
      .spyOn(process, 'exit')
      .mockImplementation(() => {});

    validateInput();

    expect(consoleSpy).toHaveBeenCalledWith(
      'Please provide a valid path to the CSV file'
    );
    expect(processExitSpy).toHaveBeenCalledWith(1);
  });

  it('should log an error message and exit the process if the argument is not a valid path', () => {
    const nonExistingFilePath = 'nonExistingFile.csv';
    const consoleSpy = jest
      .spyOn(console, 'error')
      .mockImplementation(() => {});
    const processExitSpy = jest
      .spyOn(process, 'exit')
      .mockImplementation(() => {});

    validateInput(nonExistingFilePath);

    expect(consoleSpy).toHaveBeenCalledWith(
      'The provided path does not exist',
    );
    expect(processExitSpy).toHaveBeenCalledWith(1);
  });
});

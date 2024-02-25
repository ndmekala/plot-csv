const fs = require('fs');
const {
  generateData,
  generateOptions,
  processXData,
  readInput,
} = require('../utils');

describe('generateData function', () => {
  it('should return the expected data object for numeric values', () => {
    const rawData = [
      ['x', 'y1', 'y2', 'y3'],
      ['1', '2', '3', '4'],
      ['2', '3', '4', '5'],
      ['3', '4', '5', '6'],
    ];
    const colors = {
      plotColors: ['#FF0000', '#00FF00', '#0000FF'],
    };
    const result = generateData(rawData, colors);
    expect(result).toEqual({
      datasets: [
        {
          label: 'y1',
          data: [
            { x: '1', y: '2' },
            { x: '2', y: '3' },
            { x: '3', y: '4' },
          ],
          borderColor: '#FF0000',
          backgroundColor: '#FF0000',
        },
        {
          label: 'y2',
          data: [
            { x: '1', y: '3' },
            { x: '2', y: '4' },
            { x: '3', y: '5' },
          ],
          borderColor: '#00FF00',
          backgroundColor: '#00FF00',
        },
        {
          label: 'y3',
          data: [
            { x: '1', y: '4' },
            { x: '2', y: '5' },
            { x: '3', y: '6' },
          ],
          borderColor: '#0000FF',
          backgroundColor: '#0000FF',
        },
      ],
    });
  });

  it('should return the expected data object for date values', () => {
    const rawData = [
      ['x', 'y1', 'y2', 'y3'],
      ['2023-01-01', '2', '3', '4'],
      ['2023-01-02', '3', '4', '5'],
      ['2023-01-03', '4', '5', '6'],
    ];
    const colors = {
      plotColors: ['#FF0000', '#00FF00', '#0000FF'],
    };
    const result = generateData(rawData, colors);
    expect(result).toEqual({
      datasets: [
        {
          label: 'y1',
          data: [
            { x: '2023-01-01', y: '2' },
            { x: '2023-01-02', y: '3' },
            { x: '2023-01-03', y: '4' },
          ],
          borderColor: '#FF0000',
          backgroundColor: '#FF0000',
        },
        {
          label: 'y2',
          data: [
            { x: '2023-01-01', y: '3' },
            { x: '2023-01-02', y: '4' },
            { x: '2023-01-03', y: '5' },
          ],
          borderColor: '#00FF00',
          backgroundColor: '#00FF00',
        },
        {
          label: 'y3',
          data: [
            { x: '2023-01-01', y: '4' },
            { x: '2023-01-02', y: '5' },
            { x: '2023-01-03', y: '6' },
          ],
          borderColor: '#0000FF',
          backgroundColor: '#0000FF',
        },
      ],
    });
  });

  it('should gracefully handle empty y data', () => {
    const rawData = [
      ['x', 'y1', 'y2', 'y3'],
      ['1', '', '3', ''],
      ['2', '', '', '5'],
      ['3', '4', '5', '6'],
    ];
    const colors = {
      plotColors: ['#FF0000', '#00FF00', '#0000FF'],
    };
    const result = generateData(rawData, colors);
    expect(result).toEqual({
      datasets: [
        {
          label: 'y1',
          data: [{ x: '3', y: '4' }],
          borderColor: '#FF0000',
          backgroundColor: '#FF0000',
        },
        {
          label: 'y2',
          data: [
            { x: '1', y: '3' },
            { x: '3', y: '5' },
          ],
          borderColor: '#00FF00',
          backgroundColor: '#00FF00',
        },
        {
          label: 'y3',
          data: [
            { x: '2', y: '5' },
            { x: '3', y: '6' },
          ],
          borderColor: '#0000FF',
          backgroundColor: '#0000FF',
        },
      ],
    });
  });
});

// TODO test generateOptions

describe('generateOptions function', () => {
  it('should return an options object for dates given date data', () => {});
  it('should return an options object for numbers given numbers data', () => {});
  it('should return an options object for numbers given flexible data', () => {});
});

// TODO test processXData

describe('processXData function', () => {
  it('should return the correct value if all values are parseable as numbers, but not dates', () => {});
  it('should return the correct value if all values are parseable as dates, but not numbers', () => {});
  it('should return the correct value if all values are parseable as either numbers or dates', () => {});
  it('should throw an error if any value is not parseable as either a number or a date', () => {});
  it('should throw an error if any value is an empty string', () => {});
});

describe('readInput function', () => {
  const argumentArrayLength = 3;
  it('should return the argument if it exists and is a valid path', () => {
    const argumentsArray = ['', '', './src/sample.csv'];
    const result = readInput(argumentsArray, argumentArrayLength);
    expect(result).toBe(argumentsArray[2]);
  });
  it('should throw an error if too few arguments provided', () => {
    expect(() => readInput(['', ''], argumentArrayLength)).toThrow(
      'Please provide one valid path to a CSV file',
    );
  });
  it('should throw an error if too many arguments provided', () => {
    expect(() =>
      readInput(['', '', './src/sample.csv', ''], argumentArrayLength),
    ).toThrow('Please provide one valid path to a CSV file');
  });
  it('should throw an error if the argument is not a valid path', () => {
    expect(() =>
      readInput(['', '', 'nonExistingFile.csv'], argumentArrayLength),
    ).toThrow('The provided path does not exist');
  });
});

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

/* TODO figure out xlabel… */
const generateData = (rawData, colors) => {
  const yLabels = rawData[0].slice(1);

  let data = [];

  // start at index 1 because we don’t need header row
  for (let i = 1; i < rawData[0].length; i++) {
    data.push({
      label: yLabels[i - 1],
      data: rawData
        .slice(1)
        .map((row, index) => {
          return {
            x: row[0],
            y: row[i],
          };
        })
        .filter((row) => {
          return row.y !== '';
        }),
      borderColor: colors.plotColors[i - 1],
      backgroundColor: colors.plotColors[i - 1],
    });
  }
  return { datasets: data };
};

const generateOptions = (colors, fontFamily) => {
  // TODO make dynamic --> we will need to support dates here
  return {
    responsive: true,
    color: colors.gridAxisAndTextColor,
    showLine: true,
    plugins: {
      legend: {
        labels: {
          font: {
            family: fontFamily,
          },
        },
        position: 'bottom',
      },
    },
    scales: {
      x: {
        grid: {
          color: colors.gridAxisAndTextColor,
        },
        type: 'linear',
        position: 'bottom',
        ticks: {
          color: colors.gridAxisAndTextColor,
          font: {
            family: fontFamily,
          },
        },
      },
      y: {
        grid: {
          color: colors.gridAxisAndTextColor,
        },
        ticks: {
          color: colors.gridAxisAndTextColor,
          font: {
            family: fontFamily,
          },
        },
      },
    },
  };
};

/* TODO add params thru out */

const generateChartConfig = (rawData, colors, fontFamily) => {
  const type = 'scatter';
  const data = generateData(rawData, colors);
  const options = generateOptions(colors, fontFamily);
  return {
    type,
    data,
    options,
  };
};

/*
 * should probably have some x data validation
 * y can handle string gracefully… not so much x
 * and we also need to parse x as date vs. x as number
 * */

module.exports = {
  readInput,
  generateChartConfig,
  generateData,
};

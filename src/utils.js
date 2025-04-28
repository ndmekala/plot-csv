const fs = require('fs');

const generateChartConfig = (
  rawData,
  colors,
  fontFamily,
  xDataType,
  params,
) => {
  const type = 'scatter';
  const data = generateData(rawData, colors, params);
  const options = generateOptions(colors, fontFamily, xDataType, params);
  return {
    type,
    data,
    options,
  };
};

const generateData = (rawData, colors, params) => {
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
      borderColor: colors.plotColors[(i - 1) % colors.plotColors.length],
      backgroundColor: colors.plotColors[(i - 1) % colors.plotColors.length],
      stack: params.stacked ? 'combined' : undefined
    });
  }
  return { datasets: data };
};

const generateOptions = (colors, fontFamily, xDataType, params) => {
  const generateXScaleData = (xDataType) => {
    if (xDataType === 'number' || xDataType === 'either') {
      return {
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
      };
    } else if (xDataType === 'date') {
      return {
        grid: {
          color: colors.gridAxisAndTextColor,
        },
        type: 'time',
        time: {
          tooltipFormat: 'DD T',
        },
        position: 'bottom',
        ticks: {
          color: colors.gridAxisAndTextColor,
          font: {
            family: fontFamily,
          },
        },
      };
    }
  };
  return {
    responsive: true,
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
      x: generateXScaleData(xDataType),
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
        stacked: params.stacked
      },
    },
  };
};

const processXData = (dataArray) => {
  const xValues = dataArray.map((row) => row[0]).slice(1);
  const hasEmptyStrings = (array) => {
    return !array.every((val) => {
      return val !== '';
    });
  };
  const allParseableAsNumbers = (array) => {
    return array.every((val) => {
      return !isNaN(val);
    });
  };
  const allParseableAsDates = (array) => {
    return array.every((val) => {
      let date = new Date(val);
      return !isNaN(date.getTime());
    });
  };
  if (hasEmptyStrings(xValues)) {
    throw new Error('X data cannot contain empty strings');
  } else if (allParseableAsNumbers(xValues) && allParseableAsDates(xValues)) {
    return 'either';
  } else if (allParseableAsDates(xValues)) {
    return 'date';
  } else if (allParseableAsNumbers(xValues)) {
    return 'number';
  } else {
    throw new Error('X data must be a number or date');
  }
};

const readInput = (argumentArray) => {
   if (!fs.existsSync(argumentArray[2])) {
    throw new Error('The provided path does not exist');
  } else {
    return argumentArray[2];
  }
};

module.exports = {
  generateChartConfig,
  generateData,
  generateOptions,
  processXData,
  readInput,
};

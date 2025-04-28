const express = require('express');
const fs = require('fs');
const { parse } = require('csv-parse/sync');
const { generateChartConfig, processXData, readInput } = require('./utils');
const markup = require('./index.html');
const { colors, fontFamily } = require('./constants');

main();

function main () {
  const app = express();
  let data = [];
  let xDataType;
  let params = {};

  const flags = {
    stacked: ['--stacked', '-s'],
  };

  // TODO usage and help flow
  try {
    let csvPath = readInput(process.argv);

    if (flags.stacked.some((flag) => process.argv.includes(flag))) {
      params.stacked = true;
    }

    data = parse(fs.readFileSync(csvPath, 'utf8'));
    xDataType = processXData(data);
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }

  const config = generateChartConfig(
    data,
    colors,
    fontFamily,
    xDataType,
    params,
  );

  app.get('/api/config', (req, res) => {
    res.json(config);
  });
  app.get('/', (req, res) => {
    res.header('Content-Type', 'text/html');
    res.send(markup);
  });

  const port = 4143;

  app.listen(port, () => {
    console.log(
      '\x1b[32m%s\x1b[0m',
      `
  ┌─────────────────────────────┐
  │                             │
  │    Chart 📈 on port ${port}    │
  │                             │
  └─────────────────────────────┘
  `,
    );
    import('open').then((module) => {
      module.default(`http://localhost:${port}`);
    });
  });
};



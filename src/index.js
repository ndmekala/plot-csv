const express = require('express');
const fs = require('fs');
const { parse } = require('csv-parse/sync');
const { readInput, generateChartConfig } = require('./utils');
const markup = require('./index.html');

const app = express();
let data = [];
try {
  let csvPath = readInput(process.argv, 3);
  data = parse(fs.readFileSync(csvPath, 'utf8'));
} catch (error) {
  console.error(error.message);
  process.exit(1);
}

const colors = {
  gridAxisAndTextColor: '#585858', // dk grey
  plotColors: [
    '#af005f', // dk pink
    '#ff5faf', // pink
    '#af87d7', // lavender
    '#5fafd7', // blue
    '#00afaf', // cyan
    '#5f8787', // dk cyan
    '#5faf5f', // dk green
    '#d7875f', // dk orange
  ],
};
const fontFamily = 'Fira Code, monospace';
const config = generateChartConfig(data, colors, fontFamily);

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

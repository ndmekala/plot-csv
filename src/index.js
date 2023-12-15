const express = require('express');
const fs = require('fs');
const { parse } = require('csv-parse/sync');

const app = express();

const csvPath = process.argv[2];
const csvData = fs.readFileSync(csvPath, 'utf8');
const data = parse(csvData);
console.log(data);

const xLabel = data[0][0];
const yLabels = data[0].slice(1);
console.log('xLabel', xLabel);
console.log('yLabels', yLabels);
let datasets = [];
const colors = [
  '#5faf5f',
  '#5fafd7',
  '#d7875f',
  '#afd700',
  '#af87d7',
  '#ff5faf',
  '#00afaf',
  '#5f8787',
];

for (let i = 1; i < data[0].length; i++) {
  // for each y dataset…
  datasets.push({
    label: yLabels[i - 1],
    data: data.slice(1).map((row, index) => {
      return {
        x: row[0],
        y: row[i],
      };
    }),
    borderColor: colors[i - 1],
    backgroundColor: colors[i - 1],
  });
}

console.log(datasets);

app.get('/', (req, res) => {
  res.send(`

    <style>
    .container {
      display: flex;
      justify-content: center;
    }
    .wrapper {
      max-width: 1200px;
      padding-right: 10px;
      padding-left: 10px;
    }
    .chart {
      background-color: #444444;
    }

    </style>

    <body>
    <div class="container">
      <div class="wrapper">
        <canvas class="chart" width="400" height="400" id="plot"></canvas>
      </div>
    </div>
    <body>
    
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
    
    <script>
      const ctx = document.getElementById('plot');
    

      new Chart(ctx, {
        type: 'scatter',
        data: ${JSON.stringify({ datasets })},
        options: {
          showLine: true,
          scales: {
            x: {
              type: 'linear',
              position: 'bottom',
            }
          }
        }
      });
    </script>

    `);
});

const port = 4143;

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
  import('open').then((module) => {
    module.default(`http://localhost:${port}`);
  });
});

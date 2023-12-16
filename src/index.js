const express = require('express');
const fs = require('fs');
const { parse } = require('csv-parse/sync');

const app = express();

const csvPath = process.argv[2];
const csvData = fs.readFileSync(csvPath, 'utf8');
const data = parse(csvData);

const xLabel = data[0][0];
const yLabels = data[0].slice(1);

let datasets = [];
const colors = [
  '#ff5faf',
  '#af87d7',
  '#5fafd7',
  '#00afaf',
  '#5f8787',
  '#5faf5f',
  '#afd700',
  '#d7875f',
];

for (let i = 1; i < data[0].length; i++) {
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

app.get('/', (req, res) => {
  res.send(`

    <style>

    body {
      background-color: #1c1c1c;
    }

    .container {
      display: flex;
      justify-content: center;
      padding-top: 50px;
    }

    .wrapper {
      width: 100%;
      max-width: 800px;
      padding-right: 10px;
      padding-left: 10px;
    }

    .chart {
      background-color: #1c1c1c;
    }

    </style>

    <body>
    <div class="container">
      <div class="wrapper">
        <canvas class="chart" id="plot"></canvas>
      </div>
    </div>
    <body>
    
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
    
    <script>
      const ctx = document.getElementById('plot');

      const grey = '#585858'

      new Chart(ctx, {
        type: 'scatter',
        data: ${JSON.stringify({ datasets })},
        options: {
          responsive: true,
          color: grey,
          showLine: true,
          scales: {
            x: {
              grid: {
                color: grey,
              },
              type: 'linear',
              position: 'bottom',
              ticks: {
                color: grey,
              }
            },
            y: {
              grid: {
                color: grey,
              },
              ticks: {
                color: grey,
              }
            },
          }
        }
      });
    </script>

    `);
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

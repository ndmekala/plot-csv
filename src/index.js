const express = require('express');
const fs = require('fs');
const { parse } = require('csv-parse/sync');
const { readInput } = require('./utils');

const app = express();
let csvPath = ''
let data = []

try {
  csvPath = readInput(process.argv, 3);
  data = parse(fs.readFileSync(csvPath, 'utf8'));
} catch (error) {
  console.error(error.message);
  process.exit(1);
}

const xLabel = data[0][0];
const yLabels = data[0].slice(1);

let datasets = [];
const colors = [
  '#af005f',
  '#ff5faf',
  '#af87d7',
  '#5fafd7',
  '#00afaf',
  '#5f8787',
  '#5faf5f',
  '#d7875f',
];

for (let i = 1; i < data[0].length; i++) {
  datasets.push({
    label: yLabels[i - 1],
    data: data
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
    borderColor: colors[i - 1],
    backgroundColor: colors[i - 1],
  });
}

app.get('/', (req, res) => {
  res.header('Content-Type', 'text/html');
  res.send(`
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>CSV Plot</title>
        <style>

        body {
          background-color: #1c1c1c;
        }

        h1 {
          font-family: "FiraCode Nerd Font", monospace;
          text-align: center;
          color: #ff5faf;
          font-weight: normal;
          font-size: 3rem;
          margin: 0;
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
      </head>

      <body>
        <div class="container">
          <div class="wrapper">
            <h1>CSV Plot</h1>
            <canvas class="chart" id="plot"></canvas>
          </div>
        </div>
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
              plugins: {
                legend: {
                  labels: {
                    font: {
                      family: 'FiraCode Nerd Font, monospace',
                    }
                  },
                  position: 'bottom',
                },
              },
              scales: {
                x: {
                  grid: {
                    color: grey,
                  },
                  type: 'linear',
                  position: 'bottom',
                  ticks: {
                    color: grey,
                    font: {
                      family: 'FiraCode Nerd Font, monospace',
                    }
                  }
                },
                y: {
                  grid: {
                    color: grey,
                  },
                  ticks: {
                    color: grey,
                    font: {
                      family: 'FiraCode Nerd Font, monospace',
                    }
                  }
                },
              }
            }
          });
        </script>
      </body>
    </html>
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

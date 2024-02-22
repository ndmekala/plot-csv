const express = require('express');
const fs = require('fs');
const { parse } = require('csv-parse/sync');
const { readInput, generateChartConfig } = require('./utils');
const markup = require('./index.html');

const app = express();

let csvPath = '';
let data = [];

try {
  csvPath = readInput(process.argv, 3);
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

const fontFamily = 'FiraCode Nerd Font, monospace';

const config = generateChartConfig(data, colors, fontFamily);

console.log(config);

app.get('/api/config', (req, res) => {
  res.json(config);
});

app.get('/', (req, res) => {
  res.header('Content-Type', 'text/html');
  res.send(markup);
});

/*
app.get('/old', (req, res) => {
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
*/

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

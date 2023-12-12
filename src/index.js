const express = require('express');

const app = express();

app.get('/', (req, res) => {
  res.send(`

    <div>
      <canvas id="plot"></canvas>
    </div>
    
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
    
    <script>
      const ctx = document.getElementById('plot');
    
      const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
      const lineData = {
        labels: labels,
        datasets: [{
          label: 'My First Dataset',
          data: [65, 59, 80, 81, 56, 55, 40],
          fill: false,
          borderColor: 'rgb(75, 192, 192)',
          tension: 0.1
        }]
      };

      new Chart(ctx, {
        type: 'line',
        data: lineData,
        options: {
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      });
    </script>

    `);
});

const port = 4143;

app.listen(port, () => {
  console.log(`Listening on port 4143`);
});

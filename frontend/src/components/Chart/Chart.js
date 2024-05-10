import React, { useEffect } from 'react';
import Chart from 'chart.js/auto';

const Charts = () => {
    
  useEffect(() => {
    // Initialize and configure your charts using Chart.js
    const ctx = document.getElementById('myChart').getContext('2d');
    var myChart=new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [
          {
            label: 'Sales',
            data: [12, 19, 3, 5, 2, 3, 9],
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
          },
        ],
      },
    });
    return () => {
        myChart.destroy()
      }
  }, []);

  return <canvas id="myChart" width="400" height="400"></canvas>;
};

export default Charts;

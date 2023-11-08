import React, { useEffect, useState } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { ArcElement, Chart } from 'chart.js';
import './Graph.css';

Chart.register(ArcElement);

const options = {
  responsive: true,
  plugins: {
    legend: {
      display: false,
    },
    tooltip: {
      callbacks: {
        label: function (context) {
          return `${context.label}: ${context.parsed}%`;
        },
      },
    },
    animation: {
      animateRotate: true,
      animateScale: true,
      easing: 'easeInOutQuart',
      duration: 2000,
    },
  },
};

const incomeData = {
  labels: ['Red', 'Green', 'Yellow'],
  datasets: [
    {
      label: 'Income',
      data: [300, 50, 100],
      backgroundColor: [
        'rgb(255, 99, 132)',
        'rgb(75, 192, 192)',
        'rgb(255, 205, 86)',
      ],
      hoverOffset: 4,
    },
  ],
};

const expenseData = {
  labels: ['Blue', 'Orange', 'Purple'],
  datasets: [
    {
      label: 'Expense',
      data: [200, 150, 50],
      backgroundColor: [
        'rgb(54, 162, 235)',
        'rgb(255, 159, 64)',
        'rgb(153, 102, 255)',
      ],
      hoverOffset: 4,
    },
  ],
};

const transferData = {
  labels: ['Pink', 'Cyan', 'Brown'],
  datasets: [
    {
      label: 'Transfer',
      data: [100, 200, 300],
      backgroundColor: [
        'rgb(255, 192, 203)',
        'rgb(0, 255, 255)',
        'rgb(165, 42, 42)',
      ],
      hoverOffset: 4,
    },
  ],
};

const Graph = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 2000); // Simulate a 2-second loading period

    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className="graph-container">
      <div className={`chart ${loading ? 'loading' : ''}`}>
        <h2 className="chart-title">Income</h2>
        {loading ? (
          <div className="loading-spinner">
            Loading...
          </div>
        ) : (
          <Doughnut data={incomeData} options={options} />
        )}
      </div>
      <div className={`chart ${loading ? 'loading' : ''}`}>
        <h2 className="chart-title">Expense</h2>
        {loading ? (
          <div className="loading-spinner">
            Loading...
          </div>
        ) : (
          <Doughnut data={expenseData} options={options} />
        )}
      </div>
      <div className={`chart ${loading ? 'loading' : ''}`}>
        <h2 className="chart-title">Transfer</h2>
        {loading ? (
          <div className="loading-spinner">
            Loading...
          </div>
        ) : (
          <Doughnut data={transferData} options={options} />
        )}
      </div>
    </div>
  );
};

export default Graph;

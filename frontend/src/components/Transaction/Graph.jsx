// Graph.js

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

const fetchData = async (category) => {
  try {
    const response = await fetch(`http://localhost:5000/api/${category}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Error fetching ${category} data: ${error.message}`);
    throw error;
  }
};

const Graph = () => {
  const [loading, setLoading] = useState(true);
  const [incomeData, setIncomeData] = useState([]);
  const [expenseData, setExpenseData] = useState([]);
  const [transferData, setTransferData] = useState([]);

  useEffect(() => {
    const fetchDataForCategory = async (category, setData) => {
      try {
        const data = await fetchData(category);
        setData(data);
      } catch (error) {
        // Handle errors, e.g., show an error message to the user
        console.error(`Error fetching ${category} data: ${error.message}`);
      }
    };

    Promise.all([
      fetchDataForCategory('income', setIncomeData),
      fetchDataForCategory('expense', setExpenseData),
      fetchDataForCategory('transfer', setTransferData),
    ]).then(() => setLoading(false));
  }, []);

  return (
    <div className="graph-container">
      <div className={`chart ${loading ? 'loading' : ''}`}>
        <h2 className="chart-title">Income</h2>
        {loading ? (
          <div className="loading-spinner">Loading...</div>
        ) : (
          <Doughnut
            data={{
              labels: incomeData.map((item) => item.category),
              datasets: [
                {
                  data: incomeData.map((item) => item.amount),
                  backgroundColor: [
                    'rgb(255, 99, 132)',
                    'rgb(75, 192, 192)',
                    'rgb(255, 205, 86)',
                  ],
                  hoverOffset: 4,
                },
              ],
            }}
            options={options}
          />
        )}
      </div>
      <div className={`chart ${loading ? 'loading' : ''}`}>
        <h2 className="chart-title">Expense</h2>
        {loading ? (
          <div className="loading-spinner">Loading...</div>
        ) : (
          <Doughnut
            data={{
              labels: expenseData.map((item) => item.category),
              datasets: [
                {
                  data: expenseData.map((item) => item.amount),
                  backgroundColor: [
                    'rgb(54, 162, 235)',
                    'rgb(255, 159, 64)',
                    'rgb(153, 102, 255)',
                  ],
                  hoverOffset: 4,
                },
              ],
            }}
            options={options}
          />
        )}
      </div>
      <div className={`chart ${loading ? 'loading' : ''}`}>
        <h2 className="chart-title">Transfer</h2>
        {loading ? (
          <div className="loading-spinner">Loading...</div>
        ) : (
          <Doughnut
            data={{
              labels: transferData.map((item) => item.category),
              datasets: [
                {
                  data: transferData.map((item) => item.amount),
                  backgroundColor: [
                    'rgb(255, 192, 203)',
                    'rgb(0, 255, 255)',
                    'rgb(165, 42, 42)',
                  ],
                  hoverOffset: 4,
                },
              ],
            }}
            options={options}
          />
        )}
      </div>
    </div>
  );
};

export default Graph;
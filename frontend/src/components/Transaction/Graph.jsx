import React, { useEffect, useState } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { ArcElement, Chart } from 'chart.js';
import { useTheme } from '../../ThemeContext'; // Update the path accordingly
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

const Graph = ({ userId }) => {
  const { theme } = useTheme();

  const [loading, setLoading] = useState(true);
  const [incomeData, setIncomeData] = useState([]);
  const [expenseData, setExpenseData] = useState([]);
  const [transferData, setTransferData] = useState([]);

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem('jwt');
      if (token && userId) {
        try {
          const fetchUserRecords = async (category) => {
            const response = await fetch(`http://localhost:5000/api/${category}/user/${userId}`, {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            });
            const data = await response.json();

            // console.log(data.map((item) => item.note));
            // console.log('Response from server:', data);
            return data;
          };

          const income = await fetchUserRecords('income');
          const expense = await fetchUserRecords('expense');
          const transfer = await fetchUserRecords('transfer');


          setIncomeData(income);
          setExpenseData(expense);
          setTransferData(transfer);
        } catch (error) {
          // Handle errors, e.g., show an error message to the user
          console.error(`Error fetching user data: ${error.message}`);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchUserData();
  }, [userId]);

  const renderDoughnutChart = (chartTitle, data, backgroundColor) => (
    <div className={`chart ${theme} ${loading ? 'loading' : ''}`}>
      <h2 className="chart-title">{chartTitle}</h2>
      {loading ? (
        <div className="loading-spinner">Loading...</div>
      ) : (
        <Doughnut
          data={{
            labels: data.map((item) => item.note),
            datasets: [
              {
                data: data.map((item) => item.amount),
                backgroundColor,
                hoverOffset: 4,
              },
            ],
          }}
          options={options}
        />
      )}
    </div>
  );

  return (
    <div className="graph-container">
      {renderDoughnutChart('Income', incomeData, [
        'rgb(255, 99, 132)',
        'rgb(75, 192, 192)',
        'rgb(255, 205, 86)',
      ])}
      {renderDoughnutChart('Expense', expenseData, [
        'rgb(54, 162, 235)',
        'rgb(255, 159, 64)',
        'rgb(153, 102, 255)',
      ])}
      {renderDoughnutChart('Transfer', transferData, [
        'rgb(255, 192, 203)',
        'rgb(0, 255, 255)',
        'rgb(165, 42, 42)',
      ])}
    </div>
  );
};

export default Graph;

import React, { useEffect, useState } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { ArcElement, Chart } from 'chart.js';
import axios from 'axios';
import './Graph.css';

Chart.register(ArcElement);

const options = {
  responsive: true,
  plugins: {
    legend: {
      display: true,
      labels: {
        color: 'black',
      }
    },
    tooltip: {
      callbacks: {
        label: function (tooltipItem) {
          const label = tooltipItem.label || '';
          const value = tooltipItem.raw || 0;
          return `${label}: ₹${value}`;
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

const Graph = () => {
  const [loading, setLoading] = useState(true);
  const [incomeData, setIncomeData] = useState([]);
  const [expenseData, setExpenseData] = useState([]);
  const [transferData, setTransferData] = useState([]);

  useEffect(() => {
    const fetchUserRecords = async (category) => {
      try {
        const token = localStorage.getItem('jwt'); // Retrieve token from localStorage
        const response = await axios.get(`http://localhost:5000/api/finance/get-${category}`, {
          headers: {
            Authorization: `Bearer ${token}` // Set Authorization header with Bearer token
          }
        });
        return response.data;
      } catch (error) {
        console.error(`Error fetching ${category} data: ${error.message}`);
        return [];
      }
    };

    const fetchAllData = async () => {
      setLoading(true);
      try {
        const [income, expense, transfer] = await Promise.all([
          fetchUserRecords('income'),
          fetchUserRecords('expense'),
          fetchUserRecords('transfer'),
        ]);

        setIncomeData(income);
        setExpenseData(expense);
        setTransferData(transfer);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAllData();
  }, []);

  const renderDoughnutChart = (chartTitle, data, backgroundColor) => {
    return (
      <div className={`chart ${loading ? 'loading' : ''}`}>
        <h2 className="chart-title">{chartTitle}</h2>
        {loading ? (
          <div className="loading-spinner">Loading...</div>
        ) : (
          <Doughnut
            data={{
              labels: data.map((item) => item.note),
              datasets: [
                {
                  label: chartTitle,
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
  };

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

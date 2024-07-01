import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Records.css';

const Records = () => {
  const [loading, setLoading] = useState(true);
  const [incomeData, setIncomeData] = useState([]);
  const [expenseData, setExpenseData] = useState([]);
  const [transferData, setTransferData] = useState([]);

  useEffect(() => {
    const fetchData = async (category) => {
      try {
        const token = localStorage.getItem('jwt'); // Retrieve token from localStorage
        const response = await axios.get(`http://localhost:5000/api/finance/get-${category}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        return response.data;
      } catch (error) {
        console.error(`Error fetching ${category} data: ${error.message}`);
        return []; // Return empty array on error to avoid setting undefined state
      }
    };

    const fetchAllData = async () => {
      try {
        const [income, expense, transfer] = await Promise.all([
          fetchData('income'),
          fetchData('expense'),
          fetchData('transfer'),
        ]);

        setIncomeData(income);
        setExpenseData(expense);
        setTransferData(transfer);
      } catch (error) {
        console.error(`Error fetching data: ${error.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchAllData();
  }, []);

  const formatAmount = (amount) => {
    // Format amount to Indian currency style
    return new Intl.NumberFormat('en-IN', { maximumSignificantDigits: 3 }).format(amount);
  };

  const renderData = (data, category) => {
    return (
      <div key={category} className={`records-category ${loading ? 'loading' : ''}`}>
        <h2 className="category-title">{category}</h2>
        {loading ? (
          <div className="loading-spinner">Loading...</div>
        ) : (
          <div className="record-cards-container">
            {data.map((item) => (
              <div key={item._id} className="record-card">
                <div className="card-header">
                  <p className="record-date"><b>Date: </b> {item.currentDate}</p>
                  <p className="record-amount"><b>Amount: </b> ₹{formatAmount(item.amount)}</p>
                </div>
                <p className="record-note"><b>Note: </b> {item.note}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="records-container">
      <div className="water-flow"></div>
      <p className="page-title">Your Financial Records</p>
      <div className="inner-container">
        <div className="records-category">
          {renderData(incomeData, 'Income')}
        </div>
        <div className="records-category">
          {renderData(expenseData, 'Expense')}
        </div>
        <div className="records-category">
          {renderData(transferData, 'Transfer')}
        </div>
      </div>
    </div>
  );
};

export default Records;

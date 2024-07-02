import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './LimitedRecords.css';

const LimitedRecords = () => {
  const [loading, setLoading] = useState(true);
  const [incomeData, setIncomeData] = useState([]);
  const [expenseData, setExpenseData] = useState([]);
  const [transferData, setTransferData] = useState([]);

  useEffect(() => {
    const fetchData = async (category) => {
      try {
        const token = localStorage.getItem('jwt'); // Retrieve token from localStorage
        
        const response = await axios.get(`https://monagex-backend.vercel.app/api/finance/get-${category}/limited`, {
          headers: {
            Authorization: `Bearer ${token}` // Set Authorization header with Bearer token
          }
        });
        const { data } = response;

        switch (category) {
          case 'income':
            setIncomeData(data || []);
            break;
          case 'expense':
            setExpenseData(data || []);
            break;
          case 'transfer':
            setTransferData(data || []);
            break;
          default:
            break;
        }
      } catch (error) {
        console.error(`Error fetching ${category} data: ${error.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchData('income');
    fetchData('expense');
    fetchData('transfer');
  }, []);

  const formatAmount = (amount) => {
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
    <div className="limited-records-container">
      <div className="limited-records-content">
        {renderData(incomeData, 'Income')}
        {renderData(expenseData, 'Expense')}
        {renderData(transferData, 'Transfer')}
      </div>
    </div>
  );
};

export default LimitedRecords;

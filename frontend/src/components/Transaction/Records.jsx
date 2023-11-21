import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Records.css'; // Import your CSS file for styling

const Records = ({ userId }) => {
  const [loading, setLoading] = useState(true);
  const [incomeData, setIncomeData] = useState([]);
  const [expenseData, setExpenseData] = useState([]);
  const [transferData, setTransferData] = useState([]);

  useEffect(() => {
    const fetchData = async (category) => {
      try {
        const response = await axios.get(`http://localhost:5000/api/${category}/user/${userId}`);
        return response.data;
      } catch (error) {
        console.error(`Error fetching ${category} data: ${error.message}`);
        throw error;
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
        // Handle errors, e.g., show an error message to the user
        console.error(`Error fetching user data: ${error.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchAllData();
  }, [userId]);

  const renderData = (data, category) => {
    return (
      <div key={category} className={`records-category ${loading ? 'loading' : ''}`}>
        <h2 className="category-title">{category}</h2>
        {loading ? (
          <div className="loading-spinner">Loading...</div>
        ) : (
          <ul>
            {data.map((item) => (
                <li key={item._id}>
                <div className="record-item">
                  <p className="record-date">{item.currentDate}</p>
                  <p className="record-note">{item.note}</p>
                  <p className="record-amount">₹{item.amount.toFixed(2)}</p>
                  {/* <p className="record-amount">₹{item.amount.toFixed(2)}</p>
                  <p className="record-amount">₹{item.amount.toFixed(2)}</p> */}
                  {/* Add more details as needed */}
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  };

  return (
      <>
      <div className="records-container">
    <div className="water-flow"> </div>
        <div className="innercontainer">
        <p className="page-title">Your Financial Records</p>

        <div className="income">
       {renderData(incomeData, 'Income')}
        </div>
        <div className="expense">
      {renderData(expenseData, 'Expense')}
        </div>
        <div className="transfer">
      {renderData(transferData, 'Transfer')}
        </div>
        </div>
    </div>
     </>
  );
};

export default Records;

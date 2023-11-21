import React, { useState, useEffect } from "react";
import axios from 'axios';
import UserNav from "../User/UserNav";
import Sidebar from "../Sidebar";
import ExpenseForm from "./ExpenseForm";
import Footer from "../Footer";
import './Expense.css';
import TransNav from "./TransNav";

function Expense() {
  const [userId, setUserId] = useState('');

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('jwt');
        const response = await axios.get('http://localhost:5000/api/user', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.data && response.data.user && response.data.user._id) {
          setUserId(response.data.user._id);
        } else {
          console.error('User ID not available in response:', response.data);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

  return (
    <div className="expense-container">
      <TransNav />
      <div className="expense-content">
        {/* <Sidebar /> */}
        <ExpenseForm userId={userId} />
      </div>
      <Footer />
    </div>
  );
}

export default Expense;

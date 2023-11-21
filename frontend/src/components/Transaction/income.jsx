import React, { useEffect, useState } from "react";
import axios from 'axios';
import IncomeForm from "./IncomeForm";
import Footer from "../Footer";
import './income.css';
import TransNav from "./TransNav";
import Sidebar from "../Sidebar";

const Income = () => {
  const [userId, setUserId] = useState('');

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem('jwt');
        try {
          const response = await axios.get('http://localhost:5000/api/user', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          
          // console.log(response.data.user.email);
          // console.log(response.data.user._id);
          if (response.data && response.data.user && response.data.user._id) {
            setUserId(response.data.user._id);
            localStorage.setItem('userId', response.data.user._id);
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
    <div className="income-container">
      <TransNav />
      <div className="income-content">
        {/* <Sidebar /> */}
        <IncomeForm userId={userId} />
      </div>
      <Footer />
    </div>
  );
};

export default Income;

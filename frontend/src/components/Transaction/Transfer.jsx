//transfer.jsx
import React, { useEffect, useState } from "react";
import axios from 'axios';
import UserNav from "../User/UserNav";
import Sidebar from "../Sidebar";
import TransferForm from "./TransferForm";
import Footer from "../Footer";
import './Transfer.css';
import TransNav from "./TransNav";

function Transfer() {
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
    <div className="transfer-container">
      <TransNav />
      <div className="transfer-content">
        {/* <Sidebar /> */}
        {/* Pass userId prop to TransferForm */}
        <TransferForm userId={userId} />
      </div>
      <Footer />
    </div>
  );
}

export default Transfer;

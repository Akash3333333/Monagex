import React, { useEffect, useState } from "react";
import axios from 'axios';
import Notifications from "./Notifications";
import Footer from "../Footer";
import './Split.css';
// import TransNav from "./TransNav";
import Sidebar from "../Sidebar";
import UserNav from "./UserNav";
import SplitGrp from "./SplitGrp";

function Split () {
  const [userEmail, setUserEmail] = useState('');
  const [userId, setUserId] = useState('');
//   console.log("notify "+props.userEmail);
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
            setUserEmail(response.data.user.email);
            setUserId(response.data.user._id);
            localStorage.setItem('userEmail', response.data.user.email);
          } else {
            console.error('User Email not available in response:', response.data);
          }
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
    };

    fetchUserData();
  }, []);

  return (
    <div className="split-container">
      <UserNav />
      <div className="split-content">
        <SplitGrp  userId = { userId } />
      </div>
      <Footer />
    </div>
  );
};

export default Split;

import React, { useEffect, useState } from "react";
import axios from 'axios';
import Notifications from "./Notifications";
import Footer from "../Footer";
import './MainNotifications.css';
// import TransNav from "./TransNav";
import Sidebar from "../Sidebar";
import UserNav from "./UserNav";

function MainNotifications () {
  const [userEmail, setUserEmail] = useState('');
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
    <div className="notify-container">
      <UserNav />
      <div className="notify-content">
        {/* <div className="nt-sbar">
        <Sidebar />
        </div> */}
        <Notifications  userEmail = { userEmail } />
      </div>
      <Footer />
    </div>
  );
};

export default MainNotifications;

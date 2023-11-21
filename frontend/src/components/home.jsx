// Home.jsx

import React, { useEffect, useState } from 'react';
import Footer from './Footer';
import UserNav from './User/UserNav';
import './home.css';
import Welcome from './Welcome';
import Graph from './Transaction/Graph';
import Records from './Transaction/Records';
import axios from 'axios';
import FriendList from './User/FriendList';
import SplitGrp from './User/SplitGrp';

function Home() {
  const [userId, setUserId] = useState('');
  const [userEmail, setUserEmail] = useState('');

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem('jwt');
      try {
        const response = await axios.get('http://localhost:5000/api/user', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.data && response.data.user && response.data.user._id) {
          setUserId(response.data.user._id);
          setUserEmail(response.data.user.email);
          localStorage.setItem('userId', response.data.user._id);
          localStorage.setItem('userEmail', response.data.user.email);
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
    <div className="home-container">
      <UserNav />
      <div className="home-content">
        <Welcome />

        <div className="bottom-items">
          <div className="trans">
            <Graph userId={userId} />
            <Records userId={userId} />
          </div>
          <div className="grp">
            <div className="friend">
              <FriendList userEmail={userEmail} />
            </div>
            <div className="splitgrp">
              <SplitGrp userId={userId} />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Home;

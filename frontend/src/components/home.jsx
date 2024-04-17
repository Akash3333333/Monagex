import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Grid, Typography } from '@mui/material';
import UserNav from './User/UserNav';
import Footer from './Footer';
import FriendList from './User/FriendList';
import SplitGrp from './User/SplitGrp';
import Graph from './Transaction/Graph';
import Records from './Transaction/Records';
import './home.css';
// import './home.scss';

const Home = () => {
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
{/*      
      <div class="ocean">
      <div class="wave"></div>
      <div class="wave"></div>
      <div class="wave"></div>
    </div> */}
      <div className="welcome-section">
        <Container>
        <h1 className='welcome-section-h1'>
          Welcome to MonageX
        </h1>
        <Typography variant="h5" gutterBottom>
          Your one-stop destination for all transaction tracking.
        </Typography>
        </Container>
      </div>
      <Container className="mid-portion">
        <Grid container spacing={3}>
          <Grid item xs={12} style={{ color:'white' , margin:'0' }}>
            <Graph userId={userId} />
          </Grid>
          <Grid item xs={12}>
            <Records userId={userId} />
          </Grid>
        </Grid>
      </Container>
      <Container className="bottom-portion">
     
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <div className="friend1">
              <Typography variant="h5" gutterBottom>
                Friends
              </Typography>
              <FriendList userEmail={userEmail} />
            </div>
          </Grid>
          <Grid item xs={12} md={6}>
            <div className="group1">
              <Typography variant="h5" gutterBottom>
                Groups
              </Typography>
              <SplitGrp userId={userId} />
            </div>
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </div>
  );
};

export default Home;
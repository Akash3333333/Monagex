import React from 'react';
import { Container, Grid, Typography, Link } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import UserNav from './User/UserNav';
import Footer from './Footer';
import Graph from './Transaction/Graph';
import LimitedRecords from './Transaction/LimitedRecords'; // Import LimitedRecords component
import './home.css';
import LimitedFriends from './User/LimitedFriends';
import LimitedSplitGrp from './User/LimitedSplitGrp';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <UserNav />
      <div className="welcome-section">
        <Container>
          <h1 className="welcome-section-h1">Welcome to MonageX</h1>
          <Typography variant="h5" gutterBottom>
            Your one-stop destination for all transaction tracking.
          </Typography>
        </Container>
      </div>
      <Container className="mid-portion">
        <Grid container spacing={3}>
          <Grid item xs={12} className="graph-container">
            <Graph />
          </Grid>
          <Grid item xs={12} className="records-container">
            <div className="records-header">
              <Typography variant="h4">Records</Typography>
              <Link className="view-all-records" onClick={() => navigate('/view')}>
                View All
              </Link>
            </div>
            <LimitedRecords  /> {/* Use LimitedRecords component */}
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
              <Link className="view-all-friends" onClick={() => navigate('/notifications')}>
                View All
              </Link>
              <LimitedFriends />
            </div>
          </Grid>
          <Grid item xs={12} md={6}>
            <div className="group1">
              <Typography variant="h5" gutterBottom>
                Groups
              </Typography>
              <Link className="view-all-groups" onClick={() => navigate('/split')}>
                View All
              </Link>
              <LimitedSplitGrp />
            </div>
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </div>
  );
};

export default Home;

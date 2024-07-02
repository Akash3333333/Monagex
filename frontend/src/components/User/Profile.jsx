import React, { useState, useEffect } from 'react';
import {
  Container,
  Paper,
  Typography,
  Avatar,
  Button,
  Input,
  IconButton,
  Tooltip,
  Grid,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import axios from 'axios';
import UserNav from './UserNav';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import useStyles from './ProfileStyles'; // Import the styles hook

const Profile = () => {
  const classes = useStyles(); // Use the styles hook
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const jwt = localStorage.getItem('jwt'); // Retrieve JWT token from localStorage

        const response = await axios.get('https://monagex-backend.vercel.app/api/profile/getProfile', {
          headers: {
            'Authorization': `Bearer ${jwt}` // Include JWT token in Authorization header
          }
        });
        
        setUser(response.data.user);
        setLoading(false);
      } catch (error) {
        setError('Error fetching user profile');
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setProfilePhoto(file);
  };

  const handleUpload = async () => {
    try {
      const formData = new FormData();
      formData.append('profilePhoto', profilePhoto);

      await axios.post('https://monagex-backend.vercel.app/api/profile/uploadDP', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      toast('Profile photo uploaded successfully', {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 2000,
        closeButton: false,
        hideProgressBar: false,
      });
    } catch (error) {
      console.error('Error uploading profile photo:', error);
      toast.error('Error uploading profile photo');
    }
  };

  // Function to format date in "dd Month yyyy" format
  const formatDate = (dateString) => {
    const options = { day: '2-digit', month: 'long', year: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-IN', options);
  };

  // Function to format time in IST
  const formatTime = (dateString) => {
    const options = { hour: 'numeric', minute: 'numeric', timeZone: 'Asia/Kolkata' };
    return new Date(dateString).toLocaleTimeString('en-IN', options);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className={classes.pg}>
      <UserNav />
      <Container component="main" maxWidth="md" className={classes.container}>
        <h1>Profile Page</h1>
        <Paper elevation={3} className={classes.paper}>
          {/* User avatar with upload functionality */}
          <label htmlFor="upload-avatar" className="avatarLabel">
            <Avatar className={classes.avatar}>
              {/* Display the profile photo if available, otherwise show the default avatar */}
              {user.profilePhoto ? (
                <img
                  src={`https://monagex-backend.vercel.app/uploads/${user.profilePhoto}`}
                  alt="Profile"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              ) : (
                <img src="/default-avatar.png" alt="Profile" />
              )}
            </Avatar>
            <Input
              id="upload-avatar"
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="input"
            />
            <Tooltip title="Change Photo" placement="bottom">
              <IconButton
                component="span"
                color="primary"
                aria-label="upload picture"
                className={classes.uploadButton}
              >
                <EditIcon />
              </IconButton>
            </Tooltip>
          </label>

          {/* User details */}
          <Typography variant="h5" className={classes.typo} gutterBottom>
            {user ? user.username : ''}
          </Typography>

          {/* Profile photo upload button */}
          <Button
            variant="contained"
            color="primary"
            onClick={handleUpload}
            className={classes.uploadButton}
          >
            Upload Profile Photo
          </Button>

          {/* Additional user details */}
          <Grid container spacing={2} className={classes.detailsContainer}>
            {/* Display user details */}
            <Grid item xs={12} sm={6}>
              <Typography variant="body1" className={classes.typo}>
                <strong>Name:</strong> {user ? user.username : ''}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="body1" className={classes.typo}>
                <strong>Email:</strong> {user ? user.email : ''}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="body1" className={classes.typo}>
                <strong>Last Updated At:</strong>{' '}
                {user ? formatDate(user.updatedAt) : ''}<br/>
                {user ? formatTime(user.updatedAt) : ''}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="body1" className={classes.typo}>
                <strong>Groups:</strong>
                <br />
                {user && user.groupNames && user.groupNames.length > 0 ? (
                  <ul className={classes.groupList}>
                    {user.groupNames.map((groupName, index) => (
                      <li key={index}>{groupName}</li>
                    ))}
                  </ul>
                ) : (
                  <span>No groups</span>
                )}
              </Typography>
            </Grid>
          </Grid>
          <Button
            variant="outlined"
            component={Link}
            to="/home"
            className={classes.goBackButton}
          >
            Go Back
          </Button>
        </Paper>
      </Container>
    </div>
  );
};

export default Profile;

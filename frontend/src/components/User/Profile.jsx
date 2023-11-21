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
import useStyles from './ProfileStyles'; // Import the styles hook
import { ToastContainer, toast } from 'react-toastify';

const Profile = () => {
  const classes = useStyles(); // Use the styles hook
  const [user, setUser] = useState({});
  const [profilePhoto, setProfilePhoto] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('jwt');

    const fetchUserData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/user', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setUser(response.data.user);
        // console.log(response.data.user.email);
        // console.log("profile " + user.email);
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };

    if (token) {
      fetchUserData();
    }
  }, []);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setProfilePhoto(file);
  };

  const handleUpload = async () => {
    try {
      const formData = new FormData();
      formData.append('profilePhoto', profilePhoto);
      formData.append('userId', user._id);

      await axios.post('http://localhost:5000/api/uploadphoto', formData, {
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

  return (
    <div className={classes.pg}> 
     <ToastContainer />
      <UserNav />
      <Container component="main" maxWidth="md" className={classes.container}>
        <h1> Profile Page</h1>
        <Paper elevation={3} className={classes.paper}>
          {/* User avatar with upload functionality */}
          <label htmlFor="upload-avatar" className="avatarLabel">
            <Avatar className={classes.avatar}>
              {/* Display the profile photo if available, otherwise show the default avatar */}
              {user.profilePhoto ? (
                <img
                  src={`http://localhost:5000/uploads/${user.profilePhoto}`}
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
                {user ? user.updatedAt : ''}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="body1" className={classes.typo}>
                <strong>Groups:</strong> {user ? user.groupNames : ''}
              </Typography>
            </Grid>
          </Grid>
          <Button
            variant="outlined"
            component={Link}
            to="/"
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

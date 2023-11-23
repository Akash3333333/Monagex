import React, { useState } from "react";
import { Card, CardContent, CardActions, CardHeader, Avatar, Button, Typography, Grid } from '@mui/material';
import './Friend.css'
import { toast } from "react-toastify";

function SingleUser(props) {
  const [isAdded, setIsAdded] = useState(false);
  function removeUser(name) {
    props.setSelectedUsers((prev) => {
      const arr = [];

      for (let i = 0; i < prev.length; i++) {
        if (prev[i].name !== name) {
          arr.push(prev[i]);
        }
      }

      return arr;
    });

    setIsAdded(false);
  }

  const addUser = async (user1) => {
    // console.log(user1);
    try {
      const response = await fetch('http://localhost:5000/api/friend-requests/addfriend', {
        method: 'PUT',
        body: JSON.stringify({ to_be_added: user1, userEmail: props.userEmail }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Failed to update user data: ${errorData.message}`);
      }

      const resData = await response.json();
      toast('Friend request sent successfully', {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 2000,
        closeButton: false,
        hideProgressBar: false,
      });
      // Update isAdded based on the previous state
      setIsAdded(prevState => !prevState);
      
    } catch (error) {
      console.error('Error:', error.message);
      // Handle the error, show a notification, or log it as needed
      toast.error('Error in sednding Friend Request', {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 2000,
        closeButton: false,
        hideProgressBar: false,
      });
    }
  }
  // console.log(props.friend);
  return (
    <Grid item xs={12} sm={6} md={4} lg={3} key={props.friend.id}>
      <Card className="friend-card">
        <CardHeader
          avatar={<Avatar className="friend-avatar" alt={props.friend.name} src={`http://localhost:5000/uploads/${props.friend.profilePhoto}`} />}
          title={<span className="friend-name">{props.friend.name}</span>}
        />
        <CardContent className="friend-card-content">
          <Typography variant="body2" color="textSecondary" className="friend-bio">
            {props.friend.bio}
          </Typography>
        </CardContent>
        <h2>{props.friend.username}</h2>
        <CardActions>
          <Button variant="outlined" color="primary" className="friend-button" onClick={() => addUser(props.friend._id)}>
            {isAdded ? 'Remove' : 'Add'} Friend
          </Button>
        </CardActions>
      </Card>
    </Grid>
  )
};

export default SingleUser;

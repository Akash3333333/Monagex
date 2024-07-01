import React, { useState } from 'react';
import { Card, CardContent, CardActions, CardHeader, Avatar, Button, Typography, Grid } from '@mui/material';
import './Friend.css';

function SingleUser({ friend, onAddFriend, onAcceptFriend, isRequest }) {
  const [isAdded, setIsAdded] = useState(false);
  const [isAccepted, setIsAccepted] = useState(false);

  const handleAddFriend = () => {
    onAddFriend(friend._id);
    setIsAdded(true);
  };

  const handleAcceptFriend = () => {
    onAcceptFriend(friend._id);
    setIsAccepted(true);
  };

  if (!friend || !friend.username) {
    return null;
  }

  return (
    <Grid item xs={12} sm={6} md={4} lg={3}>
      <Card className="friend-card">
        <CardHeader
          avatar={
            <Avatar
              className="friend-avatar"
              alt={friend.username}
              src={`http://localhost:5000/uploads/${friend.profilePhoto}`}
            />
          }
          title={<span className="friend-name">{friend.username}</span>}
        />
        <CardContent className="friend-card-content">
          <Typography variant="body2" color="textSecondary" className="friend-bio">
            {friend.bio}
          </Typography>
        </CardContent>
        <CardActions>
          {isRequest ? (
            <Button
              variant="outlined"
              color="primary"
              className="friend-button"
              onClick={handleAcceptFriend}
              disabled={isAccepted}
            >
              {isAccepted ? 'Request Accepted' : 'Accept Request'}
            </Button>
          ) : (
            <Button
              variant="outlined"
              color="primary"
              className="friend-button"
              onClick={handleAddFriend}
              disabled={isAdded}
            >
              {isAdded ? 'Friend Request Sent' : 'Add Friend'}
            </Button>
          )}
        </CardActions>
      </Card>
    </Grid>
  );
}

export default SingleUser;

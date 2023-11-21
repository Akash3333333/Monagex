import React, { useState } from "react";
import { Card, CardContent, CardActions, CardHeader, Avatar, Button, Typography, Grid } from '@mui/material';
import './Friend.css'

function Request(props)
{
    const [isAdded,setIsAdded]=useState(false);

  function removeUser(name)
  {
    props.setSelectedUsers((prev)=>
    {
        const arr=[];

        for(let i=0;i<prev.length;i++)
        {
            if(prev[i].name!==name)
            {
                arr.push(prev[i]);
            }
        }

        return arr;
    })

    setIsAdded(()=>
    {
      return false;
    })
  }

  const accept=async(user1)=>
  {
    // console.log(user1);
    try {
      const response = await fetch('http://localhost:5000/api/friend-requests/acceptfriend', {
        method: 'PUT',
        body: JSON.stringify({ to_be_added: user1, userEmail:props.userEmail }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Failed to update user data: ${errorData.message}`);
      }
  
      const resData = await response.json();
      console.log(resData.message);
      // Reset the form after successful group creation
    } catch (error) {
      console.error('Error:', error.message);
      // Handle the error, show a notification, or log it as needed
    }
  }
    return (
        <Grid item xs={12} sm={6} md={4} lg={3} key={props.friend.id}>
            <Card className="friend-card">
              <CardHeader
                avatar={<Avatar className="friend-avatar" alt={props.friend.name} src={props.friend.avatar} />}
                title={<span className="friend-name">{props.friend.username}</span>}
              />
              <h3>{props.friend.name}</h3>
              <CardContent className="friend-card-content">
                <Typography variant="body2" color="textSecondary" className="friend-bio">
                  {props.friend.bio}
                </Typography>
              </CardContent>
              <CardActions>
                <Button variant="outlined" color="primary" className="friend-button" onClick={()=>accept(props.friend._id)}>
                  Accept
                </Button>
              </CardActions>
            </Card>
          </Grid>
    )
};

export default Request;
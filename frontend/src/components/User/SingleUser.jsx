import React, { useState } from "react";
import { Card, CardContent, CardActions, CardHeader, Avatar, Button, Typography, Grid } from '@mui/material';
import './Friend.css'

function SingleUser(props)
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

  function addUser(user)
  {
    props.setSelectedUsers((prev)=>
    {
        const arr=[...prev];
        arr.push(user);

        return arr;
    })

    setIsAdded(()=>
    {
      return true;
    })
  }
    return (
        <Grid item xs={12} sm={6} md={4} lg={3} key={props.friend.id}>
            <Card className="friend-card">
              <CardHeader
                avatar={<Avatar className="friend-avatar" alt={props.friend.name} src={props.friend.avatar} />}
                title={<span className="friend-name">{props.friend.name}</span>}
              />
              <CardContent className="friend-card-content">
                <Typography variant="body2" color="textSecondary" className="friend-bio">
                  {props.friend.bio}
                </Typography>
              </CardContent>
              <CardActions>
                <Button variant="outlined" color="primary" className="friend-button" onClick={isAdded?()=>removeUser(props.friend.name):()=>addUser(props.friend)}>
                  {isAdded?'Remove':'Add'} Friend
                </Button>
              </CardActions>
            </Card>
          </Grid>
    )
};

export default SingleUser;
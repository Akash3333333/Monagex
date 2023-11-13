import React, { useState } from 'react';
import { Card, CardContent, CardActions, CardHeader, Avatar, Button, Typography, Grid } from '@mui/material';
import './Friend.css';
import SingleUser from './SingleUser';

const dummyFriends = [
  {
    id: 1,
    name: 'akash222',
    avatar: '/images/user1.jpg',
    bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  },
  {
    id: 2,
    name: 'abc',
    avatar: '/images/user2.jpg',
    bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  },
  {
    id: 3,
    name: 'hardik777',
    avatar: '/images/user3.jpg',
    bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  },
  {
    id: 4,
    name: 'akm111',
    avatar: '/images/user5.jpg',
    bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  },
  {
    id: 5,
    name: 'priyank111',
    avatar: '/images/user4.jpg',
    bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  },
  {
    id: 6,
    name: 'xyz111',
    avatar: '/images/user6.jpg',
    bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  },
  {
    id: 7,
    name: 'nnn111',
    avatar: '/images/user7.jpg',
    bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  },
  {
    id: 8,
    name: 'sy22',
    avatar: '/images/user8.jpg',
    bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  },
  // {
  //   id: 9,
  //   name: 'Abhishek yadav',
  //   avatar: '/images/user9.jpg',
  //   bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  // },
// { id: 10,
// name: 'Friend 10',
// avatar: 'https://via.placeholder.com/150',
// bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
// },
  
];

const Friend = (props) => {
  return (
    <div className="friend-container">
      {/* <h1 style={{padding:"5px", margin:"1rem"}}>Add Friends</h1> */}
      <Grid container spacing={2} padding={2} className='grid-container'>
        {dummyFriends.map((friend) => (
          <SingleUser setSelectedUsers={props.setSelectedUsers} friend={friend} />
        ))}
      </Grid>
    </div>
  );
};

export default Friend;
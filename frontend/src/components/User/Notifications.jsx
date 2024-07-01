import React, { useEffect, useState } from 'react';
import { Grid } from '@mui/material';
import './Friend.css';
import SingleUser from './SingleUser';
import axios from 'axios';
import { toast } from 'react-toastify';
import FriendList from './FriendList';

const Notifications = () => {
  const [allUsers, setAllUsers] = useState([]);
  const [requests, setRequests] = useState([]);
  const [friends, setFriends] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem('jwt'); // Retrieve token from localStorage
        const response = await axios.get('http://localhost:5000/api/friends/getusers', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        console.log("adsd "+response.data.users)
        setAllUsers(response.data.users);
      } catch (error) {
        console.error('Error fetching users:', error);
        toast.error('Error fetching users', { position: 'top-center' });
      }
    };

    const fetchFriends = async () => {
      try {
        const token = localStorage.getItem('jwt'); // Retrieve token from localStorage
        const response = await axios.get('http://localhost:5000/api/friends/getfriends', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        setFriends(response.data.friends);
      } catch (error) {
        console.error('Error fetching friends:', error);
        toast.error('Error fetching friends', { position: 'top-center' });
      }
    };

    const fetchRequests = async () => {
      try {
        const token = localStorage.getItem('jwt'); // Retrieve token from localStorage
        const response = await axios.get('http://localhost:5000/api/friends/getrequests', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        setRequests(response.data.requests);
      } catch (error) {
        console.error('Error fetching requests:', error);
        toast.error('Error fetching requests', { position: 'top-center' });
      }
    };

    fetchUsers();
    fetchFriends();
    fetchRequests();
  }, []);

  const handleAddFriend = async (friendId) => {
    try {
      const token = localStorage.getItem('jwt'); // Retrieve token from localStorage
      const response = await axios.put('http://localhost:5000/api/friends/addfriend', {
        to_be_added: friendId,
      }, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.status === 200) {
        console.log(" ssdf "+ response.data)
        setAllUsers(prevUsers => prevUsers.filter(user => user._id !== friendId));
        toast('Friend request sent successfully', {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 2000,
          closeButton: false,
          hideProgressBar: false,
        });
      } else {
        toast.error('Failed to send friend request', {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 2000,
          closeButton: false,
          hideProgressBar: false,
        });
      }
    } catch (error) {
      console.error('Error sending friend request:', error);
      toast.error('Error sending friend request', { position: 'top-center' });
    }
  };

  const handleAcceptFriend = async (friendId) => {
    try {
      const token = localStorage.getItem('jwt'); // Retrieve token from localStorage
      const response = await axios.put('http://localhost:5000/api/friends/acceptfriend', {
        from: friendId,
      }, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.status === 200) {
        setRequests(prevRequests => prevRequests.filter(request => request._id !== friendId));
        setFriends(prevFriends => [...prevFriends, friendId]); // Add the friend to the friends list
        toast('Friend request accepted successfully', {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 2000,
          closeButton: false,
          hideProgressBar: false,
        });
      } else {
        toast.error('Failed to accept friend request', {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 2000,
          closeButton: false,
          hideProgressBar: false,
        });
      }
    } catch (error) {
      console.error('Error accepting friend request:', error);
      toast.error('Error accepting friend request', { position: 'top-center' });
    }
  };

  return (
    <div className="friend-container">
      {/* <h1>Your Friends</h1> */}
      <FriendList />

      <h1>Total Users</h1>
      <Grid container spacing={2} padding={2} className="grid-container">
        {allUsers.map((user) => (
          <SingleUser key={user._id} friend={user} onAddFriend={handleAddFriend} />
        ))}
      </Grid>

      <h1>Requests</h1>
      <Grid container spacing={2} padding={2} className="grid-container">
        {Array.isArray(requests) && requests.length > 0 ? (
          requests.map((request) => (
            <SingleUser
              key={request._id}
              friend={request}
              onAcceptFriend={handleAcceptFriend}
              isRequest={true}
            />
          ))
        ) : (
          <p>No requests found.</p>
        )}
      </Grid>
    </div>
  );
};

export default Notifications;

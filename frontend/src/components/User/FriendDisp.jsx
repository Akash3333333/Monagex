// FriendDisp.js
import React, { useEffect, useState } from 'react';
import UserNav from '../User/UserNav';
import Sidebar from '../Sidebar';
import Footer from '../Footer';
import './Friend.css';
import axios from 'axios';
import FriendsList from './FriendList';
import { useParams } from 'react-router-dom';

const FriendDisp = (props) => {
  const [friends, setFriends] = useState([]);
//   const [friendRequestsReceived, setFriendRequestsReceived] = useState([]);
  const [friendRequestsSent, setFriendRequestsSent] = useState([]);
  const { id, friendId } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/friend-requests/getfriends/${id}`);
        setFriends(response.data.friends || []);

        // const responseRequestsReceived = await axios.get(
        //   `http://localhost:5000/api/friend-requests/friendrequestsreceived/${id}`
        // );
        // setFriendRequestsReceived(responseRequestsReceived.data.friendRequestsReceived || []);

        const responseRequestsSent = await axios.get(
          `http://localhost:5000/api/friend-requests/addfriend`
        );
        setFriendRequestsSent(responseRequestsSent.data.friendRequestsSent || []);
      } catch (error) {
        console.error('Error fetching friends and friend requests:', error);
      }
    };

    fetchData();
  }, [id, friendId]);

  const handleAddFriend = async (userId) => {
    try {
      await axios.put(`http://localhost:5000/api/friend-requests/addfriend`, {
        currLoggrdUserEmail: props.currLoggrdUserEmail,
        to_be_added: userId
      });
      // Update the state or refetch data
    } catch (error) {
      console.error('Error sending friend request:', error);
    }
  };

  const handleAcceptFriend = async (userId) => {
    try {
      await axios.put(`http://localhost:5000/api/friend-requests/acceptfriend`, {
        currLoggrdUserEmail: props.currLoggrdUserEmail,
        to_be_added: userId
      });
      // Update the state or refetch data
    } catch (error) {
      console.error('Error accepting friend request:', error);
    }
  };

  return (
    <div className="friend-container">
      <FriendsList
        friends={friends}
        // friendRequestsReceived={friendRequestsReceived}
        friendRequestsSent={friendRequestsSent}
        handleAddFriend={handleAddFriend}
        handleAcceptFriend={handleAcceptFriend}
        currLoggrdUserEmail={props.currLoggrdUserEmail}
        setSelectedUsers={props.setSelectedUsers}
      />
    </div>
  );
};

export default FriendDisp;

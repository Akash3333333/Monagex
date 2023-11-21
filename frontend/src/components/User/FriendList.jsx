// FriendList.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './FriendList.css'; // Import the CSS file

const FriendList = ({ userEmail }) => {
  const [selectedUsers, setSelectedUsers] = useState([]);

  useEffect(() => {
    // Fetch the list of users and their friends from your backend when the component mounts
    axios.get('http://localhost:5000/api/friend-requests/getfriends')
      .then((response) => {
        const myUsers = response.data.data;
        // Find the user with the matching email
        const currentUser = myUsers.find((user) => user.email === userEmail);
  
        if (currentUser) {
          // Set the selected users to be the friends of the current user
          setSelectedUsers(currentUser.friends);
        }
      })
      .catch(error => console.error('Error fetching users:', error));
  }, [userEmail]);

  return (
    <div className="friend-list-container">
      <h1 className="friend-list-header">Your Friends</h1>
      <ul className="friend-list">
        {selectedUsers.map((friend) => (
          <li key={friend._id} className="friend-list-item">
            <div>
            {friend.profilePhoto ? (
              <img src={`http://localhost:5000/uploads/${friend.profilePhoto}`} alt="Profile"
                style={{ width: '100px', height: '100px', objectFit: 'cover' , border: '4px solid #2c2d31',
                borderRadius: '10%' }} />
                ) : (
                  <img src="/images/noAvatar.png" alt="Profile" style={{ width: '100px', height: '100px', objectFit: 'cover' , border: '4px solid #2c2d31',
                  borderRadius: '10%' }} />
                )}
            </div>
            <div className="friend-details">
              <p className="friend-username">{friend.username}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FriendList;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import './FriendList.css'; // Assuming this CSS file contains styles for FriendList

const LimitedFriends = () => {
  const [friends, setFriends] = useState([]);
  const [user, setUser] = useState(null);
  const [loadingUser, setLoadingUser] = useState(true); // Separate loading state for user profile
  const [loadingFriends, setLoadingFriends] = useState(true); // Loading state for friends list
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = localStorage.getItem('jwt'); // Retrieve token from localStorage
       
        const response = await axios.get('https://monagex-backend.vercel.app/api/profile/getProfile', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        setUser(response.data.user);
      } catch (error) {
        setError('Error fetching user profile');
      } finally {
        setLoadingUser(false); // Update loading state after fetching user profile
      }
    };

    fetchUserProfile();
  }, []);

  useEffect(() => {
    if (!user || !user._id) return; // Check if user or user._id is undefined/null

    const fetchFriends = async () => {
      try {
        const token = localStorage.getItem('jwt'); // Retrieve token from localStorage
        const response = await axios.get(`https://monagex-backend.vercel.app/api/friends/getfriends/limited`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        setFriends(response.data.friends || []);
      } catch (error) {
        console.error(`Error fetching friends: ${error.message}`);
        toast.error('Error fetching friends', { position: 'top-center' });
      } finally {
        setLoadingFriends(false); // Update loading state after fetching friends
      }
    };

    fetchFriends();
  }, [user]); // Depend on user to refetch friends whenever user changes

  if (loadingUser || loadingFriends) {
    return <div>Loading...</div>; // Display loading indicator while fetching data
  }

  if (error) {
    return <div>{error}</div>; // Display error message if fetching user profile fails
  }

  return (
    <div className="friend-list-container">
      <ul className="friend-list">
        {friends.length > 0 ? (
          friends.map((friend) => (
            <li key={friend._id} className="friend-list-item">
              <div>
                {friend.profilePhoto ? (
                  <img src={`https://monagex-backend.vercel.app/uploads/${friend.profilePhoto}`} alt="Profile"
                    style={{ width: '100px', height: '100px', objectFit: 'cover', border: '4px solid #2c2d31', borderRadius: '10%' }} />
                ) : (
                  <img src="/images/noAvatar.png" alt="Profile" style={{ width: '100px', height: '100px', objectFit: 'cover', border: '4px solid #2c2d31', borderRadius: '10%' }} />
                )}
              </div>
              <div className="friend-details">
                <p className="friend-username">{friend.username}</p>
              </div>
            </li>
          ))
        ) : (
          <p>No friends found.</p>
        )}
      </ul>
    </div>
  );
};

export default LimitedFriends;

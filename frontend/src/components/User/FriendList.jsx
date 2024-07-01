import React, { useEffect, useState } from 'react';
import './FriendList.css';
import axios from 'axios';
import { toast } from 'react-toastify';

const FriendList = () => {
  const [friends, setFriends] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFriends = async () => {
      try {
        const token = localStorage.getItem('jwt'); // Retrieve token from localStorage
        const response = await axios.get('http://localhost:5000/api/friends/getfriends', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        setFriends(response.data.friends);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching friends:', error);
        toast.error('Error fetching friends', { position: 'top-center' });
        setLoading(false);
        setError('Error fetching friends');
      }
    };

    fetchFriends();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="friend-list-container">
      <h1>Your Friends</h1>
      <ul className="friend-list">
        {Array.isArray(friends) && friends.length > 0 ? (
          friends.map((friend) => (
            <li key={friend._id} className="friend-list-item">
              <div>
                {friend.profilePhoto ? (
                  <img
                    src={`http://localhost:5000/uploads/${friend.profilePhoto}`}
                    alt="Profile"
                    style={{
                      width: '100px',
                      height: '100px',
                      objectFit: 'cover',
                      border: '4px solid #2c2d31',
                      borderRadius: '10%',
                    }}
                  />
                ) : (
                  <img
                    src="/images/noAvatar.png"
                    alt="Profile"
                    style={{
                      width: '100px',
                      height: '100px',
                      objectFit: 'cover',
                      border: '4px solid #2c2d31',
                      borderRadius: '10%',
                    }}
                  />
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

export default FriendList;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Friend = ({ userEmail }) => {
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [userId, setUserId] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('jwt');

    if (token) {
      axios.get('http://localhost:5000/api/user', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          setUserId(response.data.user._id);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [userEmail]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/friend-requests/getfriends')
      .then((response) => {
        const myUsers = response.data.data;
        const currentUser = myUsers.find((user) => user.email === userEmail);

        if (currentUser) {
          setSelectedUsers(currentUser.friends.map((friend) => ({ ...friend, selected: false })));
        }
      })
      .catch(error => console.error('Error fetching users:', error));
  }, [userEmail]);

  const handleAddToGroup = (friendId) => {
    setSelectedUsers((prevUsers) => prevUsers.map((friend) =>
      friend._id === friendId ? { ...friend, selected: !friend.selected } : friend
    ));
  };

  const handleCreateGroup = async () => {
    const groupName = prompt('Enter the group name:');

    if (!groupName) {
      return;
    }

    const selectedUserIds = selectedUsers.filter((friend) => friend.selected).map((friend) => friend._id);

    try {
      const response = await axios.post('http://localhost:5000/groups/create', {
        groupName,
        members: [...selectedUserIds, userId],
      });

      toast("Group Created Successfully", {
        position: toast.POSITION.TOP_CENTER,
          autoClose: 2000,
          closeButton: false,
          hideProgressBar: false,
      });
      // You can redirect to the group page or update the UI accordingly
    } catch (error) {
      console.error('Error creating group:', error);
      toast.error('Error creating group',{
        position: toast.POSITION.TOP_CENTER,
          autoClose: 2000,
          closeButton: false,
          hideProgressBar: false,
      });
    }
  };

  return (
    <div>
      <h2>Your Friends</h2>
      <ul>
        {selectedUsers.map((friend) => (
          <li key={friend._id}>
            <div>
              <p>{friend.username}</p>
              {friend.profilePhoto ? (
              <img src={`http://localhost:5000/uploads/${friend.profilePhoto}`} alt="Profile"
                style={{ width: '100px', height: '100px', objectFit: 'cover' , border: '4px solid #2c2d31',
                borderRadius: '10%' }} />
                ) : (
                  <img src="/images/noAvatar.png" alt="Profile" style={{ width: '100px', height: '100px', objectFit: 'cover' , border: '4px solid #2c2d31',
                  borderRadius: '10%' }} />
                )}
              <button onClick={() => handleAddToGroup(friend._id)}>+</button>
            </div>
          </li>
        ))}
      </ul>
      <button onClick={handleCreateGroup}>Create Group</button>
      <ToastContainer />
    </div>
  );
};

export default Friend;

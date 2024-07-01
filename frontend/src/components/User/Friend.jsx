import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Friend.css';
import { Button, Popover, TextField, Typography } from '@mui/material';

const Friend = () => {
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [groupName, setGroupName] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    fetchFriends();
  }, []);

  const fetchFriends = async () => {
    try {
      const token = localStorage.getItem('jwt'); // Retrieve token from localStorage
      const response = await axios.get('http://localhost:5000/api/friends/getfriends', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const myUsers = response.data.friends;
      setSelectedUsers(
        myUsers.map((friend) => ({ ...friend, selected: false }))
      );
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const handleAddToGroup = (friendId) => {
    setSelectedUsers((prevUsers) =>
      prevUsers.map((friend) =>
        friend._id === friendId ? { ...friend, selected: !friend.selected } : friend
      )
    );
  };

  const resetSelectedUsers = () => {
    setSelectedUsers((prevUsers) =>
      prevUsers.map((friend) => ({ ...friend, selected: false }))
    );
  };

  const handleCreateGroup = async () => {
    const selectedUserIds = selectedUsers
      .filter((friend) => friend.selected)
      .map((friend) => friend._id);

    try {
      const token = localStorage.getItem('jwt'); // Retrieve token from localStorage
      const response = await axios.post('http://localhost:5000/api/groups/create', {
        groupName,
        description,
        members: [...selectedUserIds],
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      toast('Group Created Successfully', {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 2000,
        closeButton: false,
        hideProgressBar: false,
      });

      resetSelectedUsers();
      handleClosePopover();

    } catch (error) {
      console.error('Error creating group:', error);
      toast.error('Error creating group', {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 2000,
        closeButton: false,
        hideProgressBar: false,
      });
    }
  };

  const handleOpenPopover = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClosePopover = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  // Calculate center position of the screen
  const centerPositionX = window.innerWidth / 2;
  const centerPositionY = window.innerHeight / 2;

  return (
    <div style={{ textAlign: 'center', marginTop: '20px' }}>
      <h2>Your Friends</h2>
      <ul>
        {selectedUsers && selectedUsers.length > 0 && selectedUsers.map((friend, index) => (
          <li key={`${friend._id}-${index}`}>
            <div>
              <p>{friend.username}</p>
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
              <button
                onClick={() => handleAddToGroup(friend._id)}
                style={{ backgroundColor: '#2c2d31', color: '#fdfdfd' }}
              >
                {friend.selected ? 'Remove' : 'Add +'}
              </button>
            </div>
          </li>
        ))}
      </ul>
      <Button variant="contained" color="primary" onClick={handleOpenPopover}>
        Create Group
      </Button>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClosePopover}
        anchorReference="anchorPosition"
        anchorPosition={{ top: centerPositionY, left: centerPositionX }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        <div style={{ padding: '20px' }}>
          <Typography variant="h6">Create Group</Typography>
          <TextField
            label="Group Name"
            fullWidth
            value={groupName}
            onChange={(e) => setGroupName(e.target.value)}
            margin="normal"
          />
          <TextField
            label="Description"
            fullWidth
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            margin="normal"
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleCreateGroup}
            style={{ marginTop: '10px' }}
          >
            Create
          </Button>
        </div>
      </Popover>
    </div>
  );
};

export default Friend;

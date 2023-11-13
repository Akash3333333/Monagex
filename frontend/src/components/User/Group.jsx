// Group.jsx

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Friend from './Friend';
import './Group.css'; // Import the group.css file

const Group = () => {
  const [users, setUsers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [groupName, setGroupName] = useState('');

  useEffect(() => {
    // Fetch the list of users from your backend when the component mounts
    axios.get('http://localhost:5000/api/user')
      .then(response => setUsers(response.data))
      .catch(error => console.error('Error fetching users:', error));
  }, []);

  const createGroup = async () => {
    try {
      // Extract only the names from selected users
      const userNames = selectedUsers.map(user => user.name);

      const response = await fetch('http://localhost:5000/groups', {
        method: 'PUT',
        body: JSON.stringify({ members: userNames, groupName: groupName }),
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
      setGroupName('');
      setSelectedUsers([]);
    } catch (error) {
      console.error('Error:', error.message);
      // Handle the error, show a notification, or log it as needed
    }
  };

  return (
    <div className="group">
      <h1>Create Group</h1>
      <div>
        <label>Group Name:</label>
        <input type="text" value={groupName} onChange={(e) => setGroupName(e.target.value)} />
      </div>
      <div>
        <h2>Select Users:</h2>
      </div>
      <Friend setSelectedUsers={setSelectedUsers} />
      <button className="group-button" onClick={createGroup}>Create Group</button>
    </div>
  );
};

export default Group;

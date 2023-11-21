// Group.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Friend from './Friend';
import './Group.css'; // Import the group.css file
import { toast } from 'react-toastify';



  const Group = (props) => {
    const [selectedUsers, setSelectedUsers] = useState([]);
    const [groupName, setGroupName] = useState('');
  
    const createGroup = async () => {
      try {
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
          throw new Error(`Failed to create group: ${errorData.message}`);
        }
    
        const resData = await response.json();
        console.log(resData.message);
  
        // Show success notification
        toast('Group created successfully', {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 2000,
          closeButton: false,
          hideProgressBar: false,
        });
  
        // Reset the form after successful group creation
        setGroupName('');
        setSelectedUsers([]);
      } catch (error) {
        console.error('Error:', error.message);
  
        // Show error notification
        toast.error(`Error: ${error.message}`, { position: 'top-center' });
      }
    };

  useEffect(() => {
    // Fetch the list of users from your backend when the component mounts
    axios.get('http://localhost:5000/api/friend-requests/getfriends')
      .then((selectedUsers) =>
      {
        // setUsers(selectedUsers.data)

        for(let i=0;i<selectedUsers.data.length;i++)
        {
          if(props.userEmail===selectedUsers.data[i].email)
          {
            setSelectedUsers(()=>
            {
              return selectedUsers.data[i].friends;
            })
          }
        }
      })
      .catch(error => console.error('Error fetching users:', error));
  }, [props.userEmail]);

  return (
    <div className="group">
      <h1>Create Group</h1>
      <div>
        <label>Group Name:</label>
        <input type="text" value={groupName} onChange={(e) => setGroupName(e.target.value)} />
      </div>
      <div>
        <h2>Select Friends:</h2>
      </div>
      <Friend userEmail={props.userEmail} />
      <button className="group-button" onClick={createGroup}>Create Group</button>
    </div>
  );
};

export default Group;
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from 'axios';

function SplitGrp() {
  const [userId, setUserId] = useState('');
  const [groups, setGroups] = useState([]);

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem('jwt');
      try {
        const response = await axios.get('http://localhost:5000/api/user', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        
        if (response.data && response.data.user && response.data.user._id) {
          setUserId(response.data.user._id);
        } else {
          console.error('User ID not available in response:', response.data);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []); // Empty dependency array to run only once

  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const response = await axios.post(
          "http://localhost:5000/api/split/getgroup",
          { id: userId },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        
        if (!response.data || !response.data.group) {
          throw new Error("Failed to fetch groups");
        }
        
        setGroups(response.data.group);
      } catch (error) {
        console.error("Error fetching groups:", error);
      }
    };

    if (userId) {
      fetchGroups();
    }
  }, [userId]); // Add userId as a dependency

  return (
    <div className="grp-container" style={{ display: 'flex', flexDirection: 'column' }} >
      <h1>Group List</h1>
      {groups.map((group) => (
        <Link
          to={`/grp/${group._id}`}
          style={{ color: "gray", marginTop: '1rem', marginBottom: '1rem' }}
          activeclassName="active-link"
          key={group._id} // Use group._id as the key
        >
          {group.groupName}
        </Link>
      ))}
    </div>
  );
}

export default SplitGrp;

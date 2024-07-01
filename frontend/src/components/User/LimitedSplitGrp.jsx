import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios"; // Make sure to import axios if it's being used

function LimitedSplitGrp() {
  const [groups, setGroups] = useState([]);

  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const token = localStorage.getItem('jwt'); // Retrieve token from localStorage
        const response = await axios.get(
          `http://localhost:5000/api/groups/getgroups`, {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          }
        );

        if (!response.data || !response.data.groups) {
          throw new Error("Failed to fetch groups");
        }
        
        setGroups(response.data.groups);
      } catch (error) {
        console.error("Error fetching groups:", error);
      }
    };

    fetchGroups();
  }, []);

  return (
    <div className="grp-container">
      <h1 style={{ textAlign: 'center', marginBottom: '2rem' }}>Your Groups</h1>
      {groups.map((group) => (
        <Link
          to={`/grp/${group._id}`}
          className="group-link"
          key={group._id} // Use group._id as the key
        >
          <div className="group-card">
            <h2 className="group-name">{group.groupName}</h2>
            <p className="group-description">{group.description}</p>
            <div className="group-members">
              {group.members && Array.isArray(group.members) && group.members.slice(0, 3).map((member) => (
                <span key={member.userId} className="member-name" style={{ fontWeight:'500' }}>
                  {member.username}
                </span>
              ))}
              {group.members && Array.isArray(group.members) && group.members.length > 3 && (
                <span className="more-members">+{group.members.length - 3} more</span>
              )}
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}

export default LimitedSplitGrp;

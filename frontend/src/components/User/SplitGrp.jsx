import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import SplitItem from "./SplitItem";

function SplitGrp({ userId }) {
  const [groups, setGroups] = useState([]);

  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/api/split/getgroup",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ id: userId }),
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch groups");
        }

        const data = await response.json();
        setGroups(data.group);
      } catch (error) {
        console.error("Error fetching groups:", error);
      }
    };

    fetchGroups();
  }, [userId]);

  return (
    <div className="grp-container" style={{ display:'flex' , flexDirection: 'column' }} >
      <h1>Group List</h1>
      {groups.map((group) => (
        <Link
          to={`/grp/${group._id}`}
          style={{ color: "darkblue" , marginTop:'1rem' , marginBottom:'1rem' }}
          activeclassName="active-link"
        >
          {group.groupName}
        </Link>
      ))}
    </div>
  );
}

export default SplitGrp;

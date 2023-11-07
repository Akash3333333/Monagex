import React from "react";
import Sidebar from "../Sidebar";
import Feed from "../Feed";
import './UserProfile.css'

function UserProfile()
{
    return(
        <>
        <div className="a">
        <Sidebar />
        <Feed />
        </div>
        </>
    )
};

export default UserProfile;
import React from "react";
import UserNav from "../User/UserNav";
import Sidebar from "../Sidebar";
import Footer from "../Footer";
import './AddFriend.css';
import Friend from "./Friend";

function AddFriend() {
    return (
        <div className="friend-container">
                <UserNav/>
            <div className="friend-content">
                <Sidebar  />
                <Friend />
            </div>
            <Footer />
        </div>
    );
}

export default AddFriend;




// MainGroup.js
import React, { useEffect, useState } from "react";
import UserNav from "../User/UserNav";
import Sidebar from "../Sidebar";
import Footer from "../Footer";
import './MainGroup.css';
import Group from "./Group";
import axios from "axios";
import Friend from "./Friend";
import SplitGrp from "./SplitGrp";

function MainGroup() {
    const [userEmail, setUserEmail] = useState('');
    const [userId, setUserId] = useState('');

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
                    setUserEmail(response.data.user.email);
                    setUserId(response.data.user._id);
                    localStorage.setItem('userEmail', response.data.user.email);
                } else {
                    console.error('User ID not available in response:', response.data);
                }
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        fetchUserData();
    }, [userEmail, userId]);

    return (
        <div className="mainGroup-container">
            <UserNav/>
            <div className="mainGroup-content">
                <div className="friend">
                    <Friend userEmail={userEmail} />
                </div>
                <div className="grp1">
                    <SplitGrp userId={userId}  />
                </div>
            </div>
            <Footer/>
        </div>
    );
}

export default MainGroup;

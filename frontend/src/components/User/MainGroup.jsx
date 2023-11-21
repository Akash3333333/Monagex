import React, { useEffect, useState } from "react";
import UserNav from "../User/UserNav";
import Sidebar from "../Sidebar";
import Footer from "../Footer";
import './MainGroup.css';
import Group from "./Group";
import axios from "axios";
import Friend from "./Friend";

function MainGroup() {
    const [userEmail, setUserEmail] = useState('');
    //   console.log("notify "+props.currLoggrdUserEmail);
      useEffect(() => {
        const fetchUserData = async () => {
          const token = localStorage.getItem('jwt');
            try {
              const response = await axios.get('http://localhost:5000/api/user', {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              });
              
              // console.log(response.data.user.email);
              // console.log(response.data.user._id);
              if (response.data && response.data.user && response.data.user._id) {
                setUserEmail(response.data.user.email);
                localStorage.setItem('userEmail', response.data.user.email);
              } else {
                console.error('User ID not available in response:', response.data);
              }
            } catch (error) {
              console.error('Error fetching user data:', error);
            }
        };
    
        fetchUserData();
      }, []);
    // console.log(props.currLoggrdUserEmail+" "+'maingrp');
    return (
        <div className="mainGroup-container">
                <UserNav/>
            <div className="mainGroup-content">
                {/* <div className="mg-sbar">
                <Sidebar  />
                </div> */}
                 <Friend userEmail={ userEmail }/>
            </div>
            <Footer/>
        </div>
    );
};

export default MainGroup;
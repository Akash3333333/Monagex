import React, { useEffect, useState } from "react";
import UserNav from "../User/UserNav";
import Sidebar from "../Sidebar";
import Graph from "./Graph";
import Footer from "../Footer";
import './ViewTransac.css';
import axios from "axios";
import Records from "./Records";

const ViewTransac = () => {
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
            
            // console.log(response.data.user.email);
            // console.log(response.data.user._id);
            if (response.data && response.data.user && response.data.user._id) {
              setUserId(response.data.user._id);
              localStorage.setItem('userId', response.data.user._id);
            } else {
              console.error('User ID not available in response:', response.data);
            }
          } catch (error) {
            console.error('Error fetching user data:', error);
          }
      };
  
      fetchUserData();
    }, []);

    return (
        <div className="view-container">
            <UserNav/>
            <div className="view-content">
                <div className="view-inner">
                  <Graph userId={userId} />
                  <Records userId={userId} />
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default ViewTransac;

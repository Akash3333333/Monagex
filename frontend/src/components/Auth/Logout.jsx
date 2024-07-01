import React, { useEffect } from 'react';
import './Logout.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Logout = () => {
  const navigate = useNavigate();

   useEffect(() => {
    const logoutUser = async () => {
      try {
        const token = localStorage.getItem('jwt');

        if (!token) {
          // If token is missing, user is considered already logged out
          navigate('/');
          return;
        }

        // Simulate an HTTP request to log the user out if needed
        // Here, we're just removing the token from localStorage
        localStorage.removeItem('jwt'); // Remove the token from localStorage
        localStorage.removeItem('userId'); // Remove the userId from localStorage

        // Clear the current logged in user data
        toast.success('Logout successful!', {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 2000,
          closeButton: false,
          hideProgressBar: false,
        });
        
      } catch (error) {
        // Handle errors
        toast.error(`Logout unsuccessful: ${error.message}`, {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 2000,
          closeButton: false,
          hideProgressBar: false,
        });
      } finally {
        navigate('/'); // Always navigate to home page after logout attempt
      }
    };


    logoutUser();
  }, [navigate]);

  return (
    <div className="logout-success-container">
      <div className="logout-success-content">
        <h1>Logout Successful!</h1>
        <a href="/login">Go to Login</a>
      </div>
    </div>
  );
};

export default Logout;

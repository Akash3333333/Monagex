import React, { useEffect } from 'react';
import './Logout.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Logout =  (props) => {
  const navigate = useNavigate();

  useEffect(() => {
    const logoutUser = async () => {
      try {
        const token = localStorage.getItem('jwt');
         props.setCurrLoggedUserEmail("");
        if (!token) {
          // Token is missing, consider the user as already logged out
          navigate('/');
          return;
        }

        // Make an HTTP request to log the user out
        const response = await axios.post('http://localhost:5000/auth/logout', null, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        
        localStorage.removeItem('jwt'); // Remove the token from localStorage

        if (response.status === 200) {
          toast.success('Logout successful!', {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 2000,
            closeButton: false,
            hideProgressBar: false,
          });
          // navigate('/logout');
        } else {
          // Handle unexpected response status
          toast.error('Logout unsuccessful: Unexpected response status', {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 2000,
            closeButton: false,
            hideProgressBar: false,
          });
        }
      } catch (error) {
        // Handle errors
        toast.error(`Logout unsuccessful: ${error.message}`, {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 2000,
          closeButton: false,
          hideProgressBar: false,
        });
      }
    };

    logoutUser(); 
     // Cleanup function
    return () => {
      // Additional cleanup, if needed
    };
  }, []); // Provide an empty dependency array

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

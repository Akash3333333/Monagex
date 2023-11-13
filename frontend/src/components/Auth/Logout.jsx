import React, { useEffect } from 'react';
import './Logout.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook
import { toast } from 'react-toastify';

const Logout = () => {
  const navigate = useNavigate(); // Initialize useNavigate hook

  useEffect(() => {
    localStorage.removeItem('jwt');
    // Make an HTTP request to log the user out
    axios
      .post('http://localhost:5000/auth/logout')
      .then((response) => {
        toast.success('Logout successful!', {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 2000,
          closeButton: false,
          hideProgressBar: false,
          // className: 'toast-message',
        });
        navigate('/login'); // Use the navigate function to redirect to '/login'
      })
      .catch((error) => {
        toast.error('Logout unsuccessful!', {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 2000,
          closeButton: false,
          hideProgressBar: false,
        });
      });
  }); // Include navigate in the dependency array

  return (
    <div className="logout-success-container">
      <div className="logout-success-content">
        <h1>Logout Result</h1>
        <p>Logout successful!</p>
        <a href="/login">Go to Login</a>
      </div>
    </div>
  );
};

export default Logout;

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import './Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:5000/auth/login', {
        email,
        password,
      });

      const { token, user, expiresIn } = response.data;
      localStorage.setItem('jwt', token);
      localStorage.setItem('userId', user._id);
      // console.log(token);
      // console.log(user);

      // setTimeout(() => {
      //   // Logout logic here
      //   localStorage.removeItem('jwt');
      //   navigate('/logout');
      // }, expiresIn * 1000);

      // Redirect to the user's profile page after login
      navigate('/home');
    } catch (error) {
      handleLoginError(error);
    }
  };

  const handleLoginError = (error) => {
    if (error.response) {
      const errorMessage = error.response.data.message;
      toast.error(errorMessage, {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 2000,
        closeButton: false,
        hideProgressBar: false,
      });
    } else if (error.request) {
      console.error('No response received:', error.request);
    } else {
      console.error('Error setting up the request:', error.message);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      // If Enter key is pressed, simulate a click on the login button
      handleLogin();
    }
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <h2 className="header">Sign In</h2>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onKeyDown={handleKeyDown} // Use onKeyDown event
        />
        <button onClick={handleLogin}>Login</button>
        <div className="register2">
          <Link to="/signup">Go Back to Register</Link>
        </div>
        <div className="forgetpassword">
          <Link to="/forget-password" className="forgot-password-link">
            Forgot Password?
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;

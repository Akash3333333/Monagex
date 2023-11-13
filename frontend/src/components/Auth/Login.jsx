import React, { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import './Login.css';
import { toast } from 'react-toastify';
// import { jwtDecode } from 'jwt-decode';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isCorrect, setIsCorrect] = useState(false);
  const navigate = useNavigate();
  const token = useParams();

  const handleLogin = () => {
    axios
      .post('http://localhost:5000/auth/login', {
        email,
        password,
      })
      .then((response) => {
        const token = response.data.token;
        // Store the JWT token in local storage or session storage
        localStorage.setItem('jwt', token);
       
        toast.success('Login successful!', {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 2000,
          closeButton: false,
          hideProgressBar: false,
          className: 'toast-message',
        });
        navigate('/');
      })
      .catch((error) => {
        toast.error('Invalid credentials!', {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 2000,
          closeButton: false,
          hideProgressBar: false,
        });
        // console.error(error);
      });
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <h2 className="header">Sign In</h2>
        <input
          type="text"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={handleLogin}>Login</button>
        <div className="register2">
        <Link to="/signup">
          Go Back to Register
        </Link>
        </div>
        <div className="forgetpassword">
        <Link to="/forget-password" className="forgot-password-link">
          Forgot Password?
        </Link>
        </div>

      </div>
    </div>
  );
}

export default Login;

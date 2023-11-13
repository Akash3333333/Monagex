import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Signup.css';
import { toast } from 'react-toastify';

function Signup() {
  const [username, setUsername] = useState('');
  const [cpassword, setCPassword] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isCorrect, changeIsCorrect] = useState(false);
  const [passwordMatched, changePasswordMatched] = useState(false);
  const navigate = useNavigate();


  const handleSignup = async (e) => {
    e.preventDefault();
  
    try {
      const user = {
        username: username,
        email: email,
        password: password,
        cpassword: cpassword,
      };
  
      const response = await axios.post('http://localhost:5000/auth/signup', user);
  
      if (response.status === 201) {
        toast.success('Registration successful!',{
          position: toast.POSITION.TOP_CENTER,
          autoClose: 2000,
          closeButton: false,
          hideProgressBar: false,
        });
        const token = response.data.token;

  // Store the token securely (e.g., in a secure cookie or local storage)
  // You might want to use a state management library for handling global state.
  // For simplicity, storing in local storage here:
  localStorage.setItem('jwtToken', token);
        navigate('/login');
        // Registration successful
        console.log('Registration successful');
      } else {
        // Handle other status codes or errors
        console.log('Registration failed:', response.data.message);
      }
    } catch (error) {
       toast.error('Error in registration!',{
      position: toast.POSITION.TOP_CENTER,
      autoClose: 2000,
      closeButton: false,
      hideProgressBar: false,
    });
      console.error('Error during registration:', error);
    }
  };
  

  function PassHandler(e) {
    const x = e.target.value;
    setPassword(x);

    if (x.length >= 7 && x.length <= 15) {
      changeIsCorrect(true);
    } else {
      changeIsCorrect(false);
    }
  }

  function CheckHandler(e) {
    setCPassword(() => {
      const x = e.target.value;
      return x;
    });

    if (e.target.value === password) {
      changePasswordMatched(true);
    } else {
      changePasswordMatched(false);
    }
  }

  return (
    <div className="register">
      <div className="register-container">
        <div className="register-form">
          <h2 className="header">Register</h2>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required="true"
          />
          <input
            type="text"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required="true"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={PassHandler}
            required="true"
          />
          <input
            type="password"
            placeholder="Confirm Password"
            value={cpassword}
            onChange={CheckHandler}
            required="true"
          />
          {passwordMatched ? (
            <p className="success-message">Password Matched</p>
          ) : (
            <p className="error-message">Not Yet Matched</p>
          )}
          {isCorrect ? (
            <p className="success-message">Correct</p>
          ) : (
            <p className="error-message">
              Note: Password must be 7-15 characters and contain a digit, an uppercase letter, and a lowercase letter
            </p>
          )}
          <button onClick={handleSignup} className="register-btn">
            Register
          </button>
          <Link to="/login" className="register2">
            Log into Account
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Signup;


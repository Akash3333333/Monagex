import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import './Signup.css';

const Signup = () => {
  const [username, setUsername] = useState('');
  const [cpassword, setCPassword] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isCorrect, changeIsCorrect] = useState(false);
  const [passwordMatched, changePasswordMatched] = useState(false);
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      const user = {
        username: username,
        email: email,
        password: password,
        cpassword: cpassword,
      };


      const response = await axios.post('https://monagex-backend.vercel.app/auth/signup', user);

      if (response.status === 201) {
        toast.success('Registration successful!', {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 2000,
          closeButton: false,
          hideProgressBar: false,
        });

        navigate('/login');
      } else {
        console.log('Registration failed:', response.data.message);
      }
    } catch (error) {
      toast.error('Error in registration!', {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 2000,
        closeButton: false,
        hideProgressBar: false,
      });
      console.error('Error during registration:', error);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSignup();
    }
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="register">
      <div className="register-container">
        <div className="register-form">
          <h2 className="header">Register</h2>
          <TextField
            type="text"
            label="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            fullWidth
            margin="normal"
            variant="outlined"
            required
          />
          <TextField
            type="email"
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
            margin="normal"
            variant="outlined"
            required
          />
          <TextField
            type={showPassword ? 'text' : 'password'}
            label="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            fullWidth
            margin="normal"
            variant="outlined"
            required
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <TextField
            type="password"
            label="Confirm Password"
            value={cpassword}
            onChange={(e) => setCPassword(e.target.value)}
            fullWidth
            margin="normal"
            variant="outlined"
            onKeyDown={handleKeyDown}
            required
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
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

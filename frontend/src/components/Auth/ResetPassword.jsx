import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';

const ResetPassword = () => {
  const { token } = useParams();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  const handleResetPassword = async () => {
    if (password !== confirmPassword) {
      toast.error('Passwords do not match!', {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 2000,
        closeButton: false,
        hideProgressBar: false,
      });
      return;
    }

    try {
      const response = await axios.post(`https://monagex-backend.vercel.app/auth/reset-password/${token}`, {
        email,
        password,
        token,
      });

      toast.success('Password reset successful!', {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 2000,
        closeButton: false,
        hideProgressBar: false,
      });
      navigate('/login');
    } catch (error) {
      handleResetPasswordError(error);
    }
  };

  const handleResetPasswordError = (error) => {
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

  return (
    <div>
      <h2>Reset Password</h2>
      <div>
        <TextField
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          fullWidth
          variant="outlined"
          margin="normal"
          style={{ color: 'black' }}
        />
      </div>
      <div>
        <TextField
          label="New Password"
          type={showPassword ? 'text' : 'password'}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          fullWidth
          variant="outlined"
          margin="normal"
          style={{ color: 'black' }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() => setShowPassword(!showPassword)}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </div>
      <div>
        <TextField
          label="Confirm Password"
          type={showConfirmPassword ? 'text' : 'password'}
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          fullWidth
          variant="outlined"
          margin="normal"
          style={{ color: 'black' }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  edge="end"
                >
                  {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </div>
      <button onClick={handleResetPassword}>Reset Password</button>
    </div>
  );
};

export default ResetPassword;

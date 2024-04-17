import React, { useState } from 'react';
import axios from 'axios';
import './ForgetPassword.css'; // You can create a CSS file for styling
import { toast } from 'react-toastify';

function ForgetPassword() {
  const [email, setEmail] = useState('');

  const handleResetPassword = async () => {
    try {
      const response = await axios.post('http://localhost:5000/auth/forget-password', {
        email,
      });

      if (response.status === 200) {
        toast.success('Password reset email sent!', {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 2000,
          closeButton: false,
          hideProgressBar: false,
        });
      } else {
        throw new Error('Failed to send reset email');
      }
    } catch (error) {
      console.error(error);
      toast.error('Failed to send reset email!', {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 2000,
        closeButton: false,
        hideProgressBar: false,
      });
    }
  };

  return (
    <div className="forgot-password-container">
      <div className="forgot-password-form">
        <h2 className="header">Forgot Password</h2>
        <input
          type="text"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button onClick={handleResetPassword}>Reset Password</button>
      </div>
    </div>
  );
}

export default ForgetPassword;

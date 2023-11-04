import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Signup.css';

function Register() {
  const [username, setUsername] = useState('');
  const [cpassword, setCPassword] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = () => {
    // Add your Register logic here
  };

  return (
    <div className="register-container">
      <div className="register-form">
        <h2 className='header'>Register</h2>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
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
        <input
          type="password"
          placeholder="Confirm Password"
          value={cpassword}
          onChange={(e) => setCPassword(e.target.value)}
        />
        <button onClick={handleRegister}>Register</button>
        
        {/* Make sure the Link is within the Router component */}
        <Link to="/login" className="register2">Log into Account</Link>
      </div>
    </div>
  );
}

export default Register;
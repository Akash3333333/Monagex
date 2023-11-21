// authRoutes.js

const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const router = express.Router();
const User = require('../models/User');
require('dotenv').config();
const jwtSecretKey = process.env.JWT_SECRET_KEY;

// Registration route
router.post('/signup', async (req, res) => {
  try {
    const { username, email, password, cpassword } = req.body;

    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      username,
      email,
      password: hashedPassword,
      cpassword: hashedPassword,
    });

    // Save the user to the database
    await user.save();

    // Generate and send a JWT token for authentication
    const token = jwt.sign({ email: user.email, userId: user._id }, jwtSecretKey, { expiresIn: '1h' });
    res.cookie('jwt', token, { httpOnly: true, maxAge: 3600000 }); // Set the JWT token as a cookie
    res.status(201).json({ message: 'User registered successfully', token, userId: user._id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Registration failed' });
  }
});

// Login route
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  // Validate user credentials (you should implement your own logic here)
  const user = await User.findOne({ email });

  if (user && bcrypt.compareSync(password, user.password)) {
    // User is valid, generate and send a JWT token
    const token = jwt.sign({ email: user.email, userId: user._id }, jwtSecretKey, { expiresIn: '1h' });

    res.cookie('jwt', token, { httpOnly: true, maxAge: 3600000 }); // Set the JWT token as a cookie
    res.json({ token , user });
  } else {
    // Invalid credentials
    res.status(401).json({ message: 'Invalid credentials' });
  }
});


// Forgot Password route
router.post('/forget-password', async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Generate a unique reset token
    const resetToken = jwt.sign({ email: user.email }, process.env.JWT_SECRET_KEY, { expiresIn: '15m' });

    // Save the reset token to the user in the database
    user.resetToken = resetToken;
    await user.save();

    // Send a reset email with a link containing the reset token
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const mailOptions = {
      from: process.env.SMTP_USER,
      to: email,
      subject: 'Password Reset',
      html: `<p>Click <a href="http://localhost:3000/reset-password/${resetToken}">here</a> to reset your password.</p>`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error(error);
        return res.status(500).json({ message: 'Failed to send reset email' });
      }
      console.log('Email sent: ' + info.response);
      res.json({ message: 'Password reset email sent' });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});




// Reset Password route
router.post('/reset-password/:token', async (req, res) => {
  const resetToken = req.params.token;
  const { email, password, token } = req.body;
  
  
  try {
    // Verify the reset token
    const user = await User.findOne({ email });
    
    if (!user) {
      return res.status(404).json({ message: 'User not found or invalid token' });
    }
    
    // Check if the token is expired
    const currentTimestamp = Math.floor(Date.now() / 1000);
    // const tokenExpireTimestamp = jwt.decode(resetToken).exp;
    const tokenExpireTimestamp = jwt.decode(resetToken).exp * 1000;

    if (currentTimestamp > tokenExpireTimestamp) {
      return res.status(400).json({ message: 'Token has expired' });
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Update the user's password
    user.password = hashedPassword;
    user.cpassword =hashedPassword;
    user.resetToken = null; // Clear the reset token
    await user.save();

    res.json({ message: 'Password reset successful' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

//Logout route
router.post('/logout', async (req, res) => {
  try {
    const token = req.header('Authorization').replace('Bearer ', '');
    
    // Validate the token
    const decoded = jwt.verify(token, jwtSecretKey); // Replace with your actual secret key

    // Continue with logout logic (remove token, etc.)
    // ...

    res.status(200).json({ message: 'Logout successful' });
  } catch (error) {
    console.error('Error during logout:', error);
    res.status(500).json({ message: 'Internal server error during logout' });
  }
});



module.exports = router;

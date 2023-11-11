// authRoutes.js

const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const router = express.Router();
const User = require('../models/User');
const jwtSecretKey = "" + process.env.JWT_SECRET_KEY;
// const jwtSecretKey = process.env.JWT_SECRET_KEY;
console.log('jwtSecretKey:', jwtSecretKey); // Add this line for debugging


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
    const token = jwt.sign({ email: user.email }, jwtSecretKey, { expiresIn: '1h' });
    res.cookie('jwt', token, { httpOnly: true, maxAge: 3600000 }); // Set the JWT token as a cookie
    res.status(201).json({ message: 'User registered successfully', token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Registration failed' });
  }
});

// Login route
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find the user by email
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Verify the password
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (passwordMatch) {
      // Password matches, generate and send a JWT token
      const token = jwt.sign({ email: user.email }, jwtSecretKey, { expiresIn: '1h' });
      res.cookie('jwt', token, { httpOnly: true, maxAge: 3600000 }); // Set the JWT token as a cookie
      res.json({ message: 'Login successful', token });
    } else {
      res.status(401).json({ message: 'Incorrect password' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Login failed' });
  }
});

// Forget Password route
router.post('/forget-password', async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Generate a unique reset token
    const resetToken = jwt.sign({ email: user.email }, jwtSecretKey, { expiresIn: '15m' });

    // Save the reset token to the user in the database
    user.resetToken = resetToken;
    await user.save();

    // Send a reset email with a link containing the reset token
    const transporter = nodemailer.createTransport({
    
      host: 'sandbox.smtp.mailtrap.io',
      port: 2525,
      auth: {
        user: "fb0504758a1a74",
        pass: "3cf88027e9164d"
      },
    });

    const mailOptions = {
      from: "fb0504758a1a74",
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

// Logout route
router.post('/logout', (req, res) => {
  res.clearCookie('jwt'); // Clear the JWT token cookie
  // res.json({ message: 'Logout successful' });
});

module.exports = router;

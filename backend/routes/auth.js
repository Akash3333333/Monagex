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
require('dotenv').config();

// Reset password
// router.post('/testing', async (req, res) => {
//   try {
//     const {  email, password } = req.body;
//     const hashedPassword = await bcrypt.hash(password, 10);

//     // Check if the user already exists
//     const existingUser = await User.findOne({ email });
//     if (existingUser) {

//       console.log( email );
//       console.log( password );
//       const userEmailToUpdate = email;
//       const newPassword = hashedPassword;
     
// // Update the user's username
// // const newUsername = 'newUsername';

// // Use updateOne to update a single document
// User.updateOne({ email: userEmailToUpdate }, { $set: { password: newPassword , cpassword: newPassword}  })
//   .then(result => {
//     console.log(`Updated ${result.modifiedCount} document.`);
//   })
//   .catch(error => {
//     console.error('Error updating document:', error);
//   });
//       // console.log( cpassword );
//     }  
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Registration failed' });
//   }  
// });



router.post('/testing', async (req, res) => {
  try {
    const { email, password, token } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    // Check if the user exists and the reset token is valid
    const user = await User.findOne({ email, resetToken: token });

    if (!user) {
      return res.status(404).json({ message: 'User not found or invalid token' });
    }

    // Verify the reset token
    jwt.verify(token, jwtSecretKey, async (err, decodedToken) => {
      if (err) {
        console.error(err);
        return res.status(400).json({ message: 'Invalid token' });
      }

      const currentTimestamp = Math.floor(Date.now() / 1000);

      if (currentTimestamp > decodedToken.exp) {
        return res.status(400).json({ message: 'Token has expired' });
      }

      // Update the user's password
      user.password = hashedPassword;
      user.resetToken = null; // Clear the reset token
      await user.save();

      res.json({ message: 'Password reset successful' });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});





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
      const token = jwt.sign({ email: user.email, userId: user._id }, jwtSecretKey, { expiresIn: '1h' });
      res.cookie('jwt', token, { httpOnly: true, maxAge: 3600000 }); // Set the JWT token as a cookie
      res.json({ message: 'Login successful', token, userId: user._id });
    } else {
      res.status(401).json({ message: 'Incorrect password' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Login failed' });
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
  const { password } = req.body;

  try {
    // Verify the reset token
    const user = await User.findOne({ resetToken });

    if (!user) {
      return res.status(404).json({ message: 'User not found or invalid token' });
    }

    // Check if the token is expired
    const currentTimestamp = Math.floor(Date.now() / 1000);
    const tokenExpireTimestamp = jwt.decode(resetToken).exp;

    if (currentTimestamp > tokenExpireTimestamp) {
      return res.status(400).json({ message: 'Token has expired' });
    }

    // Check if passwords match
    // if (password !== confirmPassword) {
    //   return res.status(400).json({ message: 'Passwords do not match' });
    // }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Update the user's password
    user.password = hashedPassword;
    user.resetToken = null; // Clear the reset token
    await user.save();

    res.json({ message: 'Password reset successful' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});


// Logout route
router.post('/logout', (req, res) => {
  res.clearCookie('jwt'); // Clear the JWT token cookie
  // res.json({ message: 'Logout successful' });
  console.log('Logout Successful');
});

module.exports = router;

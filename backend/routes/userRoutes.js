// userRoutes.js
const express = require('express');
const router = express.Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const jwtSecretKey = process.env.JWT_SECRET_KEY;


// Fetch user information
router.get('/', async (req, res) => {
  try {
    const token = req.cookies.jwt || req.headers.authorization?.split(' ')[1];

    if (!token) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    jwt.verify(token, jwtSecretKey, async (err, user) => {
      if (err) {
        if (err.name === 'TokenExpiredError') {
          return res.status(401).json({ message: 'Token has expired' });
        }
        return res.status(403).json({ message: 'Forbidden' });
      }
      // console.log(user);
      const userId = user.userId;

      const userFromDb = await User.findById(userId);
      // console.log(userFromDb);
      if (!userFromDb) {
        return res.status(404).json({ message: 'User not found' });
      }

       const userData = {
        username: userFromDb.username,
        email: userFromDb.email,
        userID : userFromDb._id,
      //   // Include other fields as needed
       };

      res.json({ user: userFromDb });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching user information' });
  }
});



// Update user information
router.put('/', async (req, res) => {
  try {
    const token = req.cookies.jwt || req.headers.authorization?.split(' ')[1];

    if (!token) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const user = jwt.verify(token, jwtSecretKey);
    const userId = user.userId;

    const { username, email } = req.body;

    const userFromDb = await User.findOneAndUpdate(
      { _id: userId },
      { username, email },
      { new: true }
    );

    if (!userFromDb) {
      return res.status(404).json({ message: 'User not found' });
    }

    const updatedUserData = {
      username: userFromDb.username,
      email: userFromDb.email,
      // profilePicture: userFromDb.profilePicture, // Include other fields as needed
    };

    res.json({ message: 'User updated successfully', user: updatedUserData });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error updating user information' });
  }
});
// ... (other routes)

module.exports = router;

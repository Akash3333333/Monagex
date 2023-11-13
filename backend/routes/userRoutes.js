// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Fetch user information
router.get('/', async (req, res) => {
  try {
    const username = req.user.username; // Assuming username is used for identification

    const user = await User.findOne({ username });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const userData = {
      username: user.username,
      email: user.email,
      profilePicture: user.profilePicture, // Include other fields as needed
    };

    res.json(userData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching user information' });
  }
});

// Update user information
router.put('/', async (req, res) => {
  try {
    const username = req.user.username; // Assuming username is used for identification
    const { email, password, cpassword } = req.body; // Include other fields as needed

    const user = await User.findOneAndUpdate(
      { username },
      { email, password, cpassword },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Optionally, you can return the updated user data
    const updatedUserData = {
      username: user.username,
      email: user.email,
      profilePicture: user.profilePicture, // Include other fields as needed
    };

    res.json({ message: 'User updated successfully', user: updatedUserData });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error updating user information' });
  }
});

module.exports = router;

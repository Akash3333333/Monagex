const express = require('express');
const router = express.Router();
const User = require('../models/User'); // Import your User model

// Example route for fetching user information including profile picture URL
router.get('/', async (req, res) => {
  try {
    // Assuming you have the user's ID from your authentication middleware
    const userId = req.user.id; // Adjust this based on your authentication setup

    // Retrieve the user's information, including the profile picture URL, from the database
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Return the user's data, including the profile picture URL
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching user information' });
  }
});

module.exports = router;

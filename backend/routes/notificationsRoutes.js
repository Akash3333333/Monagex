// routes/notificationsRoutes.js
const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Fetch user notifications
router.get('/', async (req, res) => {
  try {
    const username = req.user.username; // Assuming username is used for identification

    const user = await User.findOne({ username })
      .populate('friends', 'username') // Populate friends with only usernames
      .populate('sent', 'username') // Populate sent requests with only usernames
      .populate('requests', 'username'); // Populate friend requests with only usernames

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const notificationsData = {
      friends: user.friends,
      sentRequests: user.sent,
      friendRequests: user.requests,
    };

    res.json(notificationsData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching user notifications' });
  }
});

module.exports = router;

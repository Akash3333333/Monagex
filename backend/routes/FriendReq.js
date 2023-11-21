// routes/FriendReq.js
const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Fetch friends
router.get('/getfriends', async (req, res) => {
  
  try {
    const my_users = await User.find({}).populate("friends");
  
    // Send the retrieved documents to the frontend
    // console.log(my_users)
    res.json({ data: my_users });

  } catch (error) {
    console.error('Error fetching friends:', error.message);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Send friend request
router.put('/addfriend', async (req, res) => {
  try {
    console.log(req.body);
    const emailToUpdate = req.body.userEmail;
    const newFriendData = req.body.to_be_added;

    const user2 = await User.findById(newFriendData);
    const user1 = await User.findOne({ email: emailToUpdate });

    if (!user1 || !user2) {
      return res.status(404).json({ message: 'User not found' });
    }

    await User.findOneAndUpdate(
      { _id: user1._id },
      { $push: { sent: user2._id } }
    );

    await User.findOneAndUpdate(
      { _id: user2._id },
      { $push: { requests: user1._id } }
    );

    res.status(200).json({ message: 'Friend request sent successfully' });
  } catch (err) {
    console.error('Error sending friend request:', err);
    res.status(500).send('Internal Server Error');
  }
});

// Accept friend request
router.put('/acceptfriend', async (req, res) => {
  try {
    const emailToUpdate = req.body.userEmail;
    const newFriendData = req.body.to_be_added;

    const user1 = await User.findOne({ email: emailToUpdate });
    const user2 = await User.findById(newFriendData);

    if (!user1 || !user2) {
      return res.status(404).json({ message: 'User not found' });
    }

    await User.findOneAndUpdate(
      { _id: user1._id },
      {
        $pull: { requests: user2._id },
        $push: { friends: user2._id }
      }
    );

    await User.findOneAndUpdate(
      { _id: user2._id },
      {
        $push: { friends: user1._id },
        $pull: { sent: user1._id }
      }
    );

    res.status(200).json({ message: 'Friend request accepted successfully' });
  } catch (err) {
    console.error('Error accepting friend request:', err);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;

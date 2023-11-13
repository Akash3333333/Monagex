// routes/groups.js
const express = require('express');
const router = express.Router();
const Group = require('../models/Group');
const User = require('../models/User');

router.put('/', async (req, res) => {
  try {
    const { members, groupName } = req.body;

    // Create a new group
    const newGroup = await Group.create({ groupName, members });

    // Add the group to each user's 'friends' and 'groupNames' fields
    for (const memberName of members) {
      const user = await User.findOne({ username: memberName });

      if (!user) {
        // Handle the case where the user is not found
        return res.status(404).json({ message: `User '${memberName}' not found` });
      }

      // Check if the group is already in the user's friends
      if (!user.friends || !user.friends.includes(newGroup._id)) {
        user.friends = user.friends || [];
        user.friends.push(newGroup._id);
        user.groupNames = user.groupNames || [];
        user.groupNames.push(groupName);
        await user.save();
      }
    }

    res.json({ message: 'Group created successfully', group: newGroup });
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;

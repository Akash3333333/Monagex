const express = require('express');
const router = express.Router();
const Group = require('../models/Group');
const User = require('../models/User');


router.post('/create', async (req, res) => {
  try {
    // Extract data from the request body
    const { groupName, members } = req.body;

    // Check if the group name and members are provided
    if (!groupName || !members || !Array.isArray(members) || members.length === 0) {
      return res.status(400).json({ error: 'Invalid request data' });
    }

    // Validate that all provided member IDs exist in the User collection
    const invalidMembers = await User.find({ _id: { $in: members } }).select('_id');
    if (invalidMembers.length !== members.length) {
      return res.status(400).json({ error: 'Invalid user IDs in members array' });
    }

    // Create the group
    const group = new Group({
      groupName,
      members,
    });

    // Save the group to the database
    await group.save();

    // Push the groupId into the groups array of each member
    for (const memberId of members) {
      const user = await User.findById(memberId);

      if (user) {
        user.groups.push({
          group: group._id,
          owe: 0,
          lent: 0,
        });

        await user.save();
      }
    }

    res.json({ message: 'Group created successfully', group });
  } catch (error) {
    console.error('Error creating group:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;

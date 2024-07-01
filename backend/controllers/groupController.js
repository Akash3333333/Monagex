const Group = require('../models/Group');
const User = require('../models/User');

exports.createGroup = async (req, res) => {
  try {
    const { groupName, description, members } = req.body;
    members.push(req.user.id);
    if (!groupName || !description || !members || !Array.isArray(members) || members.length === 0) {
      return res.status(400).json({ error: 'Invalid request data' });
    }

    const validMembers = await User.find({ _id: { $in: members } }).select('_id');
    if (validMembers.length !== members.length) {
      return res.status(400).json({ error: 'Invalid user IDs in members array' });
    }

    const group = new Group({
      groupName,
      description,
      members,
      owe: [],
      transactionHistory: []
    });

    for (let i = 0; i < members.length; i++) {
      const memberId = members[i];
      const otherMembers = members.filter(id => id !== memberId);
      const debts = otherMembers.map(otherId => ({ user: otherId, amount: 0 }));

      group.owe.push({ user: memberId, debts });

      const user = await User.findById(memberId);
      if (!user) {
        console.error(`User with ID ${memberId} not found`);
        return res.status(404).json({ error: `User with ID ${memberId} not found` });
      }

      if (!user.groupNames.includes(groupName)) {
        user.groupNames.push(groupName);
      }

      user.groups.push({ group: group._id });
      await user.save();
    }
    await group.save();
    res.json({ message: 'Group created successfully', group });
  } catch (error) {
    console.error('Error creating group:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.getUserGroups = async (req, res) => {
  try {
    const userId = req.user.id;

    if (!userId) {
      return res.status(400).json({ error: 'User ID is required' });
    }

    const user = await User.findById(userId).populate({
      path: 'groups.group',
      populate: {
        path: 'members',
        select: 'username',
      }
    });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const userGroups = user.groups.map(group => {
      if (group.group) {
        return {
          _id: group.group._id,
          groupName: group.group.groupName,
          description: group.group.description,
          members: group.group.members.map(member => ({
            id: member._id,
            username: member.username,
          })),
        };
      } else {
        return {
          _id: null,
          groupName: 'Unknown',
          description: 'No description',
          members: [],
        };
      }
    });

    res.json({ groups: userGroups });
  } catch (error) {
    console.error('Error fetching user groups:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.getLimitedUserGroups = async (req, res) => {
  try {
    const userId = req.user.id;

    if (!userId) {
      return res.status(400).json({ error: 'User ID is required' });
    }

    const user = await User.findById(userId).populate({
      path: 'groups.group',
      populate: {
        path: 'members',
        select: 'username',
      }
    });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const userGroups = user.groups
      .slice(0, 3)
      .map(group => {
        if (group.group) {
          return {
            _id: group.group._id,
            groupName: group.group.groupName,
            description: group.group.description,
            members: group.group.members.map(member => ({
              id: member._id,
              username: member.username,
            })),
          };
        } else {
          return {
            _id: null,
            groupName: 'Unknown',
            description: 'No description',
            members: [],
          };
        }
      });

    res.json({ groups: userGroups });
  } catch (error) {
    console.error('Error fetching user groups:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.getGroupMembers = async (req, res) => {
  const groupId = req.body.id;
  try {
    const group = await Group.findById(groupId).populate('members', 'username');
    if (!group) {
      return res.status(404).json({ message: 'Group not found' });
    }

    const members = group.members.map(member => ({
      id: member._id,
      username: member.username,
    }));

    res.json({ groupName: group.groupName, members });
  } catch (error) {
    console.error('Error fetching group members:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

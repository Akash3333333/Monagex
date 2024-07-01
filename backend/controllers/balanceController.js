const Group = require('../models/Group');
const User = require('../models/User');

// Controller function to fetch owe data
exports.fetchOweData = async (req, res) => { 
  const {  groupId } = req.body;
  try {
    // Find the group by groupId 
    const group = await Group.findById(groupId);

    if (!group) {
      return res.status(404).json({ message: 'Group not found' });
    }

    // Check if oweData exists for the user in the group
    const oweData = group.owe.find(entry => entry.user.equals(req.user.id));

    if (!oweData) {
      return res.status(404).json({ message: 'Owe data not found for the user in this group' });
    }

    // Get usernames of all group members
    const userIds = group.members.map(member => member.toString());
    const users = await User.find({ _id: { $in: userIds } });

    // Construct oweData in the required format
    const formattedOweData = oweData.debts.map(debt => {
      const user = users.find(user => user._id.toString() === debt.user.toString());
      return user ? { [user.username]: debt.amount } : null;
    }).filter(debt => debt !== null);

    res.json(formattedOweData);

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
};

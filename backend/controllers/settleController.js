const Group = require('../models/Group'); // Adjust the path to your Group model
const User = require('../models/User'); // Adjust the path to your User model
const { settleDebtsAndNotify } = require('../utils/settleNotification');

// POST route for settling debts
const settleDebts = async (req, res) => {
  const { groupId } = req.params;
  const { description, lenders, amount } = req.body; // Changed variable name to 'lenders'
  const loggedInUserId = req.user.id; // Assuming you have middleware to get logged-in user id

  try {
    // Find the group by groupId
    const group = await Group.findById(groupId);
    if (!group) {
      return res.status(404).json({ error: 'Group not found' });
    }

    // Validate lenders amounts against owed amounts
    for (const lenderId in lenders) {
      const amount = lenders[lenderId];

      // Check if lenderId exists in owe field
      let lenderOwe = group.owe.find(entry => entry.user.equals(lenderId));
      if (!lenderOwe) {
        return res.status(400).json({ error: `User ${lenderId} does not owe anything` });
      }

      // Check if loggedInUserId owes lenderId
      let loggedInUserDebt = lenderOwe.debts.find(debt => debt.user.equals(loggedInUserId));
      if (!loggedInUserDebt || loggedInUserDebt.amount < amount) {
        return res.status(400).json({ error: `Cannot settle more than owed to user ${lenderId}` });
      }
    }

    // Process the lenders object
    for (const lenderId in lenders) {
      const amount = lenders[lenderId];

      // Check if lender exists
      const lender = await User.findById(lenderId);
      

      // Update owe field for lenderId
      let lenderOwe = group.owe.find(entry => entry.user.equals(lenderId));
      let loggedInUserDebt = lenderOwe.debts.find(debt => debt.user.equals(loggedInUserId));
      loggedInUserDebt.amount -= amount;
      
      // Update owe field for loggedInUserId
      let loggedInUserOwe = group.owe.find(entry => entry.user.equals(loggedInUserId));
      let lenderDebt = loggedInUserOwe.debts.find(debt => debt.user.equals(lenderId));
      lenderDebt.amount += amount;
      
      // Record transaction history
      group.transactionHistory.push({
        from: loggedInUserId,
        to: lenderId,
        amount: amount,
        description: description
      });
    }

    // Save updated grouo
    await group.save();

    // Send group notification to all members
    await settleDebtsAndNotify(group,loggedInUserId, description, amount, lenders, new Date().toLocaleString());

    res.status(200).json({ message: 'Debts settled successfully', group });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

module.exports = { settleDebts };

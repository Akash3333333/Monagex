const Group = require('../models/Group');
const User = require('../models/User');
const sendGroupNotification = require('../utils/splitNotification');

// Controller function for splitting debts
exports.splitDebts = async (req, res) => {
  const { groupId } = req.params;
  const { description, borrowers, yourShare, amount } = req.body;
  const loggedInUserId = req.user.id; // Assuming you have middleware to get logged-in user id

  try {
    // Find the group by groupId
    const group = await Group.findById(groupId);
    if (!group) {
      return res.status(404).json({ error: 'Group not found' });
    }

    // Process each borrower in the borrowers object
    for (const borrowerId in borrowers) {
      const amount = borrowers[borrowerId];

      // Check if borrower exists
      const borrower = await User.findById(borrowerId);

      // Update owe field for logged-in user
      let loggedInUserOwe = group.owe.find(entry => entry.user.equals(loggedInUserId));
      if (loggedInUserOwe) {
        let borrowerDebt = loggedInUserOwe.debts.find(debt => debt.user.equals(borrowerId));
        if (borrowerDebt) {
          borrowerDebt.amount += amount;
        } else {
          loggedInUserOwe.debts.push({ user: borrowerId, amount });
        }
      } else {
        group.owe.push({ user: loggedInUserId, debts: [{ user: borrowerId, amount }] });
      }

      // Update owe field for borrowerId
      let borrowerOwe = group.owe.find(entry => entry.user.equals(borrowerId));
      if (borrowerOwe) {
        let lenderDebt = borrowerOwe.debts.find(debt => debt.user.equals(loggedInUserId));
        if (lenderDebt) {
          lenderDebt.amount -= amount;
        } else {
          borrowerOwe.debts.push({ user: loggedInUserId, amount: -amount });
        }
      } else {
        group.owe.push({ user: borrowerId, debts: [{ user: loggedInUserId, amount: -amount }] });
      }

      // Update transaction history
      group.transactionHistory.push({
        from: loggedInUserId,
        to: borrowerId,
        amount: amount,
        description: description
      });
    }

    // Save updated group
    await group.save();

    // Send group notification to all members
    await sendGroupNotification.sendGroupNotification(group, loggedInUserId, description, amount, borrowers, yourShare, new Date().toLocaleString());

    res.status(200).json({ message: 'Debts split successfully', group });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

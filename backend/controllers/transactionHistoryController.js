const Group = require('../models/Group');
const User = require('../models/User');

// Controller function to get transaction history for a group
exports.getTransactionHistory = async (req, res) => {
    const groupId = req.params.groupId;

    try {
        // Find the group by groupId and select transactionHistory
        const group = await Group.findById(groupId).select('transactionHistory');
        if (!group) {
            return res.status(404).json({ message: 'Group not found' });
        }

        // Prepare an array to store formatted transactions
        const transactions = [];

        // Iterate through transactionHistory and replace 'from' and 'to' with usernames
        for (const transaction of group.transactionHistory) {
            // Fetch 'from' user's username
            const fromUser = await User.findById(transaction.from).select('username');
            // Fetch 'to' user's username
            const toUser = await User.findById(transaction.to).select('username');

            // Format date and time
            const formattedDate = transaction.createdAt.toLocaleDateString();
            const formattedTime = transaction.createdAt.toLocaleTimeString();

            // Push formatted transaction object with usernames, date, time, and description
            transactions.push({
                from: fromUser ? fromUser.username : 'Unknown User',
                to: toUser ? toUser.username : 'Unknown User',
                amount: transaction.amount,
                description: transaction.description,
                createdAt: `${formattedDate} ${formattedTime}`
            });
        }
        res.json(transactions);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

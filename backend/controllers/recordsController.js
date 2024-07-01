const Income = require('../models/Income');
const Expense = require('../models/Expense');
const Transfer = require('../models/Transfer');

// Function to get all records for a specific user
exports.getAllRecords = async (req, res) => {
  try {
    const userId = req.params.userId;
    const [incomeRecords, expenseRecords, transferRecords] = await Promise.all([
      Income.find({ user: userId }),
      Expense.find({ user: userId }),
      Transfer.find({ user: userId }),
    ]);

    res.status(200).json({ income: incomeRecords, expense: expenseRecords, transfer: transferRecords });
  } catch (error) {
    console.error('Error fetching records:', error.message);
    res.status(500).json({ error: 'Failed to retrieve records', details: error.message });
  }
};

// Function to get limited records for a specific user
exports.getLimitedRecords = async (req, res) => {
  try {
    const userId = req.params.userId;
    const [incomeRecords, expenseRecords, transferRecords] = await Promise.all([
      Income.find({ user: userId }).limit(3).sort({ date: -1 }),
      Expense.find({ user: userId }).limit(3).sort({ date: -1 }),
      Transfer.find({ user: userId }).limit(3).sort({ date: -1 }),
    ]);

    res.status(200).json({
      income: incomeRecords,
      expense: expenseRecords,
      transfer: transferRecords
    });
  } catch (error) {
    console.error('Error fetching records:', error.message);
    res.status(500).json({ error: 'Failed to retrieve records', details: error.message });
  }
};

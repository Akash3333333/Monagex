// financeController.js

const Income = require('../models/Income');
const Expense = require('../models/Expense');
const Transfer = require('../models/Transfer');

const handleErrorResponse = (res, message) => {
  res.status(500).json({ error: message });
};

// Create a new income record
exports.createIncome = async (req, res) => {
  try {
    const incomeData = {
      ...req.body,
      user: req.user.id, // Add the user ID from the request
    };

    const newIncome = new Income(incomeData);
    const savedIncome = await newIncome.save();
    res.status(201).json(savedIncome)
  } catch (error) {
    handleErrorResponse(res, 'Failed to save income data');
  }
};

// Retrieve all income records for a specific user
exports.getIncome = async (req, res) => {
  try {
    const userId = req.user.id;
    const incomeRecords = await Income.find({ user: userId });
    res.status(200).json(incomeRecords);
  } catch (error) {
    handleErrorResponse(res, 'Failed to retrieve income data');
  }
};

// Retrieve at most 3 income records for a specific user
exports.getLimitedIncome = async (req, res) => {
  try {
    const userId = req.user.id;
    const limitedIncomeRecords = await Income.find({ user: userId }).limit(3);
    res.status(200).json(limitedIncomeRecords);
  } catch (error) {
    handleErrorResponse(res, 'Failed to retrieve limited income data');
  }
};

// Create a new expense record
exports.createExpense = async (req, res) => {
  try {
    const expenseData = {
      ...req.body,
      user: req.user.id, // Add the user ID from the request
    };
    const newExpense = new Expense(expenseData);
    const savedExpense = await newExpense.save();
    res.status(201).json(savedExpense);
  } catch (error) {
    handleErrorResponse(res, 'Failed to save expense data');
  }
};

// Retrieve all expense records for a specific user
exports.getExpense = async (req, res) => {
  try {
    const userId = req.user.id;
    const expenseRecords = await Expense.find({ user: userId });
    res.status(200).json(expenseRecords);
  } catch (error) {
    handleErrorResponse(res, 'Failed to retrieve expense data');
  }
};

// Retrieve at most 3 expense records for a specific user
exports.getLimitedExpense = async (req, res) => {
  try {
    const userId = req.user.id;
    const limitedExpenseRecords = await Expense.find({ user: userId }).limit(3);
    res.status(200).json(limitedExpenseRecords);
  } catch (error) {
    handleErrorResponse(res, 'Failed to retrieve limited expense data');
  }
};

// Create a new transfer record
exports.createTransfer = async (req, res) => {
  try {
    const transferData = {
      ...req.body,
      user: req.user.id, // Add the user ID from the request
    };
    const newTransfer = new Transfer(transferData);
    const savedTransfer = await newTransfer.save();
    res.status(201).json(savedTransfer);
  } catch (error) {
    handleErrorResponse(res, 'Failed to save transfer data');
  }
};

// Retrieve all transfer records for a specific user
exports.getTransfer = async (req, res) => {
  try {
    const userId = req.user.id;
    const transferRecords = await Transfer.find({ user: userId });
    res.status(200).json(transferRecords);
  } catch (error) {
    handleErrorResponse(res, 'Failed to retrieve transfer data');
  }
};

// Retrieve at most 3 transfer records for a specific user
exports.getLimitedTransfer = async (req, res) => {
  try {
    const userId = req.user.id;
    const limitedTransferRecords = await Transfer.find({ user: userId }).limit(3);
    res.status(200).json(limitedTransferRecords);
  } catch (error) {
    handleErrorResponse(res, 'Failed to retrieve limited transfer data');
  }
};

// routes/expenseRoutes.js

const express = require('express');
const router = express.Router();
const Expense = require('../models/Expense');

// Create a new expense record
router.post('/', async (req, res) => {
  try {
    const newExpense = new Expense(req.body);
    const savedExpense = await newExpense.save();
    res.status(201).json(savedExpense);
  } catch (error) {
    res.status(400).json({ error: 'Failed to save expense data' });
  }
});

// Retrieve all expense records
router.get('/', async (req, res) => {
  try {
    const expenseRecords = await Expense.find();
    res.status(200).json(expenseRecords);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve expense data' });
  }
});

module.exports = router;

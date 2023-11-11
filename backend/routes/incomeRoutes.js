// routes/incomeRoutes.js
const express = require('express');
const router = express.Router();
const Income = require('../models/Income');

// Create a new income record
router.post('/', async (req, res) => {
  try {
    const newIncome = new Income(req.body);
    const savedIncome = await newIncome.save();
    res.status(201).json(savedIncome);
  } catch (error) {
    res.status(400).json({ error: 'Failed to save income data' });
  }
});

// Retrieve all income records
router.get('/', async (req, res) => {
  try {
    const incomeRecords = await Income.find();
    res.status(200).json(incomeRecords);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve income data' });
  }
});

module.exports = router;

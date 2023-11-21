const express = require('express');
const router = express.Router();
const Income = require('../models/Income');

// Create a new income record
router.post('/', async (req, res) => {
  try {
    const newIncome = new Income(req.body);
    const savedIncome = await newIncome.save();
    res.status(201).json(savedIncome);
  }  catch (error) {
    res.status(500).json({ error: 'Failed to save income data', details: error.message });
  }
});

// Retrieve all income records for a specific user
router.get('/user/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;
    // console.log('userId:', userId); // Log the userId for debugging
    const incomeRecords = await Income.find({ user: userId });
    // console.log('incomeRecords:', incomeRecords); // Log the retrieved records for debugging
    res.status(200).json(incomeRecords);
  } catch (error) {
    console.error('Error retrieving income data:', error.message);
    res.status(500).json({ error: 'Failed to retrieve income data', details: error.message });
  }
});


module.exports = router;

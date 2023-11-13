// routes/transferRoutes.js

const express = require('express');
const router = express.Router();
const Transfer = require('../models/Transfer');

// Create a new transfer record
router.post('/', async (req, res) => {
  try {
    const newTransfer = new Transfer(req.body);
    const savedTransfer = await newTransfer.save();
    res.status(201).json(savedTransfer);
  } catch (error) {
    res.status(400).json({ error: 'Failed to save transfer data' });
  }
});

// Retrieve all transfer records
router.get('/', async (req, res) => {
  try {
    const userId = req.query.userId;
    const transferRecords = await Transfer.find({ user: userId });
    res.status(200).json(transferRecords);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve transfer data' });
  }
});

module.exports = router;

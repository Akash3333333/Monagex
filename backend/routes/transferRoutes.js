// transferRoutes.js
const express = require('express');
const router = express.Router();
const Transfer = require('../models/Transfer');

const handleErrorResponse = (res, message) => {
  res.status(500).json({ error: message });
};

// Create a new transfer record
router.post('/', async (req, res) => {
  try {
    const newTransfer = new Transfer(req.body);
    const savedTransfer = await newTransfer.save();
    res.status(201).json(savedTransfer);
  } catch (error) {
    handleErrorResponse(res, 'Failed to save transfer data');
  }
});

// Retrieve all transfer records for a specific user
router.get('/user/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;
    const transferRecords = await Transfer.find({ user: userId });
    res.status(200).json(transferRecords);
  } catch (error) {
    handleErrorResponse(res, 'Failed to retrieve transfer data');
  }
});

module.exports = router;

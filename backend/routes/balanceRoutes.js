const express = require('express');
const router = express.Router();
const balanceController = require('../controllers/balanceController');
const {authenticateUser } = require('../config/authMiddleware');

// POST route to fetch owe data
router.post('/owe',authenticateUser, balanceController.fetchOweData);

module.exports = router;

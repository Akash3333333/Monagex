const express = require('express');
const router = express.Router();
const transactionHistoryController = require('../controllers/transactionHistoryController');
const {authenticateUser} = require('../config/authMiddleware');

router.use(authenticateUser);
router.get('/:groupId', transactionHistoryController.getTransactionHistory);

module.exports = router;

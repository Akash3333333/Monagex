const express = require('express');
const router = express.Router();
const financeController = require('../controllers/financeController');
const {authenticateUser } = require('../config/authMiddleware');

// Middleware to authenticate requests
router.use(authenticateUser);

// Income routes    
router.post('/create-income', financeController.createIncome);
router.get('/get-income/', financeController.getIncome);
router.get('/get-income/limited', financeController.getLimitedIncome);

// Expense routes
router.post('/create-expense', financeController.createExpense);
router.get('/get-expense/', financeController.getExpense);
router.get('/get-expense/limited', financeController.getLimitedExpense);

// Transfer routes
router.post('/create-transfer', financeController.createTransfer);
router.get('/get-transfer', financeController.getTransfer);
router.get('/get-transfer/limited', financeController.getLimitedTransfer);

module.exports = router;

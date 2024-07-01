const express = require('express');
const router = express.Router();
const simplifyDebtsController = require('../controllers/simplifyDebtsController');
const {authenticateUser} = require('../config/authMiddleware');

router.use(authenticateUser);
// POST route for simplifying debts
router.post('/:groupId/', simplifyDebtsController.simplifyDebts);

module.exports = router;

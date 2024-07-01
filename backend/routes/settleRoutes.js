const express = require('express');
const router = express.Router();
const { settleDebts } = require('../controllers/settleController');
const {authenticateUser} = require('../config/authMiddleware');

router.use(authenticateUser);
// POST route for settling debts
router.post('/:groupId', settleDebts);

module.exports = router;

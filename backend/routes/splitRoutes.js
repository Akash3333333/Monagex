const express = require('express');
const router = express.Router();
const splitController = require('../controllers/splitController');
const {authenticateUser} = require('../config/authMiddleware');

router.use(authenticateUser);
// POST route for splitting debts
router.post('/:groupId', splitController.splitDebts);

module.exports = router;

const express = require('express');
const router = express.Router();
const {authenticateUser} = require('../config/authMiddleware');
const recordsController = require('../controllers/recordsController'); // Adjust the path as needed

// Route to get all records for a specific user
router.get('/getAllRecords', authenticateUser, recordsController.getAllRecords);

// Route to get limited records for a specific user
router.get('getAllRecords/limited',authenticateUser, recordsController.getLimitedRecords);

module.exports = router;
const express = require('express');
const router = express.Router();
const groupController = require('../controllers/groupController');
const {authenticateUser} = require('../config/authMiddleware');

router.use(authenticateUser);



// Create a new group
router.post('/create', groupController.createGroup);

// Fetch all groups for a specific user
router.get('/getgroups', groupController.getUserGroups);

// Fetch a limited number of groups (at most 3) for a specific user
router.get('/limited/', groupController.getLimitedUserGroups);

// Fetch members of a specific group
router.post('/getMembers', groupController.getGroupMembers);

module.exports = router;

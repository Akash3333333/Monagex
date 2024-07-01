const express = require('express');
const router = express.Router();
const friendController = require('../controllers/friendController');
const {authenticateUser} = require('../config/authMiddleware');

router.use(authenticateUser);

router.put('/addfriend', friendController.sendFriendRequest);
router.put('/acceptfriend', friendController.acceptFriendRequest);
router.get('/getfriends/', friendController.getAllFriends);
router.get('/getfriends/limited', friendController.getLimitedFriends);
router.get('/getrequests', friendController.getAllFriendRequests);
router.get('/getusers', friendController.getAllUsers);

module.exports = router;

// profileRoutes.js
const express = require('express');
const router = express.Router();
const profileController = require('../controllers/profileController');
const {authenticateUser} = require('../config/authMiddleware');

router.use(authenticateUser);
// Fetch user information
router.get('/getProfile', profileController.getProfile);

// Update user information
router.put('/editProfile', profileController.editProfile);

// Upload profile photo
router.post('/uploadDP', profileController.uploadDP);

module.exports = router;

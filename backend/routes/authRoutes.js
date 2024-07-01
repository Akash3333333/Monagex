const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const {authenticateUser} = require('../config/authMiddleware');

router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.post('/forget-password', authController.forgotPassword);
router.post('/reset-password/:token', authController.resetPassword);
router.post('/logout', authenticateUser, authController.logout);

module.exports = router;

const express = require('express');
const router = express.Router();
const User = require('../models/User'); // Import your User model

// Fetch users with payments due
router.get('/', async (req, res) => {
  try {
    // Fetch users based on your criteria, for example, payments due in the next 30 days
    const usersWithPaymentsDue = await User.find({
      paymentDueDate: { $lte: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) },
    });

    // You can customize the response as needed
    const response = usersWithPaymentsDue.map(user => ({
      username: user.username,
      email: user.email,
      paymentDueDate: user.paymentDueDate,
      // Add other fields as needed
    }));

    res.json(response);
  } catch (error) {
    console.error('Error fetching users with payments due:', error.message);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;

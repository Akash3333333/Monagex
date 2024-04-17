// routes/upload.js
const express = require('express');
const multer = require('multer');
const path = require('path');
const User = require('../models/User');
const router = express.Router();

// Define storage for the uploaded photos
const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, 'E:/Monagex/backend/uploads/'); // Specify the directory for storing uploaded photos
  },
  filename: (req, file, callback) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const fileExtension = path.extname(file.originalname);
    callback(null,   uniqueSuffix + fileExtension);
  },
});

const upload = multer({ storage });

router.post('/', upload.single('profilePhoto'), async (req, res) => {
    try {
      const userId = req.body.userId;
  
      // Update the user's profilePhoto field with the filename
      const updatedUser = await User.findByIdAndUpdate(userId, { profilePhoto: req.file.filename }, { new: true });
  
      if (!updatedUser) {
        console.error('User not found');
        return res.status(404).json({ message: 'User not found' });
      }
  
      // console.log('User updated successfully:', updatedUser);
      return res.status(200).json({ message: 'Profile photo uploaded successfully' });
    } catch (error) {
      console.error('Error updating user profile photo:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });
  

module.exports = router;

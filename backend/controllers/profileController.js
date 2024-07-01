// profileController.js
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const path = require('path');
require('dotenv').config();
const jwtSecretKey = process.env.JWT_SECRET_KEY;

// Define storage for the uploaded photos
const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, 'E:/Monagex/backend/uploads/'); // Specify the directory for storing uploaded photos
  },
  filename: (req, file, callback) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const fileExtension = path.extname(file.originalname);
    callback(null, uniqueSuffix + fileExtension);
  },
});

const upload = multer({ storage });

// Upload profile photo
exports.uploadDP = upload.single('profilePhoto'), async (req, res) => {
  try {
    const userId = req.user.id;

    // Update the user's profilePhoto field with the filename
    const updatedUser = await User.findByIdAndUpdate(userId, { profilePhoto: req.file.filename }, { new: true });

    if (!updatedUser) {
      console.error('User not found');
      return res.status(404).json({ message: 'User not found' });
    }

    return res.status(200).json({ message: 'Profile photo uploaded successfully' });
  } catch (error) {
    console.error('Error updating user profile photo:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Fetch user information
exports.getProfile = async (req, res) => {
  try {
      const userFromDb = await User.findById(req.user.id);
      if (!userFromDb) {
        return res.status(404).json({ message: 'User not found' });
      }

      res.json({ user: userFromDb });
    
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching user information' });
  }
};

// Update user information
exports.editProfile = async (req, res) => {
  try {
    const token = req.cookies.jwt || req.headers.authorization?.split(' ')[1];

    if (!token) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const userId = req.user.id;

    const { username, email } = req.body;

    const userFromDb = await User.findOneAndUpdate(
      { _id: userId },
      { username, email },
      { new: true }
    );

    if (!userFromDb) {
      return res.status(404).json({ message: 'User not found' });
    }

    const updatedUserData = {
      username: userFromDb.username,
      email: userFromDb.email,
      // profilePicture: userFromDb.profilePicture, // Include other fields as needed
    };

    res.json({ message: 'User updated successfully', user: updatedUserData });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error updating user information' });
  }
};

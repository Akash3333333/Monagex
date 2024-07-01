const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  // Existing fields
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  cpassword: {
    type: String,
    required: true,
  },
  profilePhoto: {
    type: String, // Store the filename of the profile photo
  },
  friends: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  }],
  sent: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  }],
  requests: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  }],
  groups: [{
    group: { type: mongoose.Schema.Types.ObjectId, ref: 'Group' },
  }],
  groupNames: {
    type: [String], // Array of group names
    required: true,
    default: [], // Default to empty array
  },
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

module.exports = User;

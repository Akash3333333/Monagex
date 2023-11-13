// models/User.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  // Remove the 'user' field if not needed
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
  friends: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Group' }],
  groupNames: [{ type: String }],
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);

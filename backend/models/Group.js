// models/Group.js
const mongoose = require('mongoose');

const groupSchema = new mongoose.Schema({
  groupName: { type: String, required: true },
  members: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
}, { timestamps: true });

module.exports = mongoose.model('Group', groupSchema);

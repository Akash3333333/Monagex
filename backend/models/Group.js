// models/Group.js
const mongoose = require('mongoose');

const groupSchema = new mongoose.Schema({
  groupName: { type: String, required: true },
  members: [{ type: String, ref: 'User' }],
});

module.exports = mongoose.model('Group', groupSchema);

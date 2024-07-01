// models/Transfer.js

const mongoose = require('mongoose');

const transferSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, required: true },
  currentDate: { type: String, required: true },
  currentTime: { type: String, required: true },
  amount: { type: Number, required: true },
  paymentFrom: { type: String, required: true },
  paymentTo: { type: String, required: true },
  uploadFile: { type: String },
  note: { type: String },
}, { timestamps: true });

module.exports = mongoose.model('Transfer', transferSchema);

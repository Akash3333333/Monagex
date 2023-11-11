// models/Income.js
const mongoose = require('mongoose');

const incomeSchema = new mongoose.Schema({
  currentDate: { type: Date, required: true },
  amount: { type: Number, required: true },
  category: { type: String, required: true },
  accountType: { type: String, enum: ['Current', 'Savings'], required: true },
  payer: { type: String, required: true },
  note: { type: String },
});

module.exports = mongoose.model('Income', incomeSchema);


// models/Expense.js

const mongoose = require('mongoose');

const expenseSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, required: true },
  currentDate: { type: String, required: true },
  currentTime: { type: String, required: true },
  amount: { type: Number, required: true },
  category: { type: String, required: true },
  uploadFile: { type: String },
  paymentMethod: { type: String, required: true },
  payee: { type: String, required: true },
  note: { type: String },
}, { timestamps: true });

module.exports = mongoose.model('Expense', expenseSchema);

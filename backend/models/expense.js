// models/Expense.js

const mongoose = require('mongoose');

const expenseSchema = new mongoose.Schema({
  // user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  currentDate: { type: Date, required: true },
  // currentTime: { type: Date , required: true },
  amount: { type: Number, required: true },
  category: String,
  image: String,
  paymentMethod: String,
  payee: String,
  note: String,
});

module.exports = mongoose.model('Expense', expenseSchema);

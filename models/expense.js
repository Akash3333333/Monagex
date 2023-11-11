// models/Expense.js

const mongoose = require('mongoose');

const expenseSchema = new mongoose.Schema({
  currentDate: { type: Date, required: true },
  amount: { type: Number, required: true },
  category: String,
  image: String,
  paymentMethod: String,
  payer: String,
  note: String,
});

module.exports = mongoose.model('Expense', expenseSchema);

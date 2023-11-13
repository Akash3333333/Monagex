// models/Income.js
const mongoose = require('mongoose');

const incomeSchema = new mongoose.Schema({
  // user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  currentDate: { type: Date, required: true },
  // currentTime: { type: Date , required: true },
  amount: { type: Number, required: true },
  category: { type: String, required: true },
  accountType: { type: String, enum: ['Current', 'Savings'], required: true },
  payer: { type: String, required: true },
  uploadFile: { type: String },
  note: { type: String },
  
}, {timeStamps: true} );

module.exports = mongoose.model('Income', incomeSchema);


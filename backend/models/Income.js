const mongoose = require('mongoose');

const incomeSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, required: true },
  currentDate: { type: String, required: true },
  currentTime: { type: String, required: true },
  amount: { type: Number, required: true },
  category: { type: String, required: true },
  accountType: { type: String, required: true },
  payer: { type: String, required: true },
  note: { type: String },
}, { timestamps: true });

module.exports = mongoose.model('Income', incomeSchema);

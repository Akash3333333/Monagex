const mongoose = require('mongoose');

const debtSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  amount: { type: Number, required: true }
});

const groupSchema = new mongoose.Schema({
  groupName: { type: String, required: true },
  description: { type: String, required: true },
  members: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
  owe: [{
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    debts: [debtSchema] 
  }],
  transactionHistory: [{
    from: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    to: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    amount: { type: Number, required: true },
    description: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
  }]
}, { timestamps: true });

module.exports = mongoose.model('Group', groupSchema);

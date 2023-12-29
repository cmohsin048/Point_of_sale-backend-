const mongoose = require('mongoose');

const expense = new mongoose.Schema({
  storeID: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
});

const Expense = mongoose.model('Expense', expense);

module.exports = Expense;

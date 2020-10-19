const mongoose = require('mongoose');

const expenseDetailsSchema = new mongoose.Schema({
  expenseId: {
    type: Number,
    required: true,
    unique: true
  },
  category: {
    type: String,
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  details: {
    type: String
  },
  date: {
    type: String, // ToDo: Change to Date
    required: true
  }
});

const expensesSchema = new mongoose.Schema({
  userId: {
    type: Number,
    required: true,
    unique: true
  },
  userName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  expenses: [expenseDetailsSchema]
});

module.exports = mongoose.model('Expenses', expensesSchema);

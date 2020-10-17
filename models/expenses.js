const mongoose = require('mongoose');

const expenseDetailsSchema = new mongoose.Schema({
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
    type: Date,
    required: true
  }
});

const expensesSchema = new mongoose.Schema({
  userId: {
    type: String,
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

const Expense = require('../models/expenses');

const getExpenses = (req, res) => {
  res.json({expenses: {
    date: '16/10/2020',
    category: 'Some Category',
    amount: 1000,
    details: 'no details'
  }});
};

const addExpense = (req, res) => {
  let expense = new Expense(req.body);
  expense.save((err, exp) => {
    console.log('saving')
    if (err) {
      return res.status(400).json(err);
    }
    return res.status(200).json(exp);
  });
};

exports.getExpenses = getExpenses;
exports.addExpense = addExpense;

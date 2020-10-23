const expensesService = require('../services/expensesService');
const Expense = require('../models/expenses'); // ToDo: Move this model to expensesService file

const getExpenses = (req, res) => {
  res.json({expenses: {
    date: '16/10/2020',
    category: 'Some Category',
    amount: 1000,
    details: 'no details'
  }});
};

const getExpensesByUser = (req, res) => {
  const userId = req.params.id;
  console.log('User Id: ' + userId);
  
};

const addExpense = (req, res) => {
  expensesService.addExpense(req.body)
    .then(
      () => res.status(200)
    )
    .catch(
      () => res.status(400)
    )
};

exports.getExpenses = getExpenses;
exports.addExpense = addExpense;

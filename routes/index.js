const express = require('express'),
      router = express.Router(),
      expensesController = require('../controllers/expensesController'),
      Expense = require('../models/expenses');

router.get('/expenses', expensesController.getExpenses);

router.post('/expenses', (req, res) => {
  let expense = new Expense(req.body);
  expense.save((err, exp) => {
    console.log('saving')
    if (err) {
      return res.status(400).json(err);
    }
    return res.status(200).json(exp);
  });
});

module.exports = router;

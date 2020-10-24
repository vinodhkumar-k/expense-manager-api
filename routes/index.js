const express = require('express'),
      router = express.Router(),
      expensesController = require('../controllers/expensesController');

router.get('/expenses/:id', expensesController.getExpensesByUser);

router.get('/expenses/:id/:month', expensesController.getUserExpensesByMonth);

router.post('/expenses', expensesController.addExpense);

module.exports = router;

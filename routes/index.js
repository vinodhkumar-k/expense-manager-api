const express = require('express'),
      router = express.Router(),
      expensesController = require('../controllers/expensesController');

router.get('/expenses/:id', expensesController.getExpensesByUser);

router.get('/expenses/:id/:month', expensesController.getUserExpensesByMonth);

router.post('/expenses', expensesController.addExpense);

router.put('/expenses', expensesController.updateExpense);

router.delete('/expenses/:id/:month/:expenseId', expensesController.deleteExpense);

module.exports = router;

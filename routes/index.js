const express = require('express'),
      router = express.Router(),
      expensesController = require('../controllers/expensesController'),
      analyticsController = require('../controllers/analyticsController');

router.get('/expenses/:id', expensesController.getExpensesByUser);

router.get('/expenses/:id/:month', expensesController.getExpensesForSpecificMonth);

router.post('/expenses', expensesController.addExpense);

router.put('/expenses', expensesController.updateExpense);

router.delete('/expenses/:id/:month/:expenseId', expensesController.deleteExpense);

// Analytics routes

router.get('/analytics/:id', analyticsController.getTotalExpensesForAllMonths);

router.get('/analytics/category/:id/:month', analyticsController.getCategoryWiseExpensesForAMonth);

router.get('/analytics/category/:id', analyticsController.getCategoryWiseExpensesForAllMonths);

module.exports = router;

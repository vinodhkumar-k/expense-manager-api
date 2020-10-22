const express = require('express'),
      router = express.Router(),
      expensesController = require('../controllers/expensesController');

router.get('/expenses', expensesController.getExpenses);

router.post('/expenses', expensesController.addExpense);

module.exports = router;
module

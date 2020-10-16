const express = require('express'),
      router = express.Router(),
      expensesController = require('../controllers/expensesController');

router.get('/expenses', expensesController.getExpenses);

module.exports = router;
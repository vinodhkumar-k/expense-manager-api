const mongoose = require('mongoose'),
      q = require('q');
const Expense = require('../models/expenses');

const addExpense = (expenseDetails) => {
  /*expense.save((err, exp) => {
    console.log('saving')
    if (err) {
      return res.status(400).json(err);
    }
    return res.status(200).json(exp);
  });*/
  const deferred = q.defer();
  const userId = expenseDetails.userId;
  const newExpense = {
    expenseId: expenseDetails.expenses[0].expenseId,
    date: expenseDetails.expenses[0].date,
    category: expenseDetails.expenses[0].category,
    amount: expenseDetails.expenses[0].amount,
    details: expenseDetails.expenses[0].details
  };
  console.log(expenseDetails);
  Expense.findById(userId).exec((err, user) => {
    if (err) {
      deferred.reject({"status": 500, "jsonResult": {"result": err}});
    } else if (!user) {
      deferred.reject({"status": 404, "jsonResult": {"result": "User not found"}});
    } else {
      console.log("User found implement business logic here")
    }
  });
};

exports.addExpense = addExpense;

const mongoose = require('mongoose'),
  q = require('q'),
  _ = require('lodash');
const Expense = require('../models/expenses');

const addExpense = (expenseDetails) => {
  const deferred = q.defer();
  const userId = expenseDetails.userId;
  const newExpense = {...expenseDetails.expenses.expenditure[0]};
  Expense.find({ userId: userId }).exec((err, user) => {
    if (err) {
      deferred.reject({ "status": 500, "jsonResult": { "result": err } });
    } else if (!user.length) {
      //deferred.reject({"status": 404, "jsonResult": {"result": "User not found"}});
      new Expense(expenseDetails).save((error, result) => {
        if (error) {
          console.log("Error occured is");
          console.log(error);
          return;
        }
        console.log("Result is: ");
        console.log(result);
        return;
      })
    } else {
      let expensesForMonth = _.find(user[0].expenses, { month: expenseDetails.expenses.month });
      if (expensesForMonth) {
        Expense.update(
          { userId: userId,  "expenses.month": expenseDetails.expenses.month},
          // { $push: { expenses: { month: expenseDetails.expenses.month, expenditure: [newExpense] } } },
          {$push: {"expenses.$.expenditure": newExpense}},
          (error, result) => {
            if (error) {
              deferred.reject({ "status": 500, "jsonResult": { "result": error } })
            } else if (!result) {
              deferred.reject({ "status": 404, "jsonResult": { "result": "Could not find the expenses" } });
            } else {
              deferred.resolve({ "status": 200, "jsonResult": { "result": result } });
            }
          }
        );
      } else {
        Expense.update(
          { userId },
          {$addToSet: {expenses: {month: expenseDetails.expenses.month, expenditure: [newExpense]}}},
          (error, result) => {
            if (error) {
              deferred.reject({ "status": 500, "jsonResult": { "result": error } });
            } else if (!result) {
              deferred.reject({ "status": 404, "jsonResult": { "result": "Could not find the expenses" } });
            } else {
              deferred.resolve({ "status": 200, "jsonResult": { "result": result } });
            }
          }
        );
      }
    }
  });
  return deferred.promise;
};

exports.addExpense = addExpense;

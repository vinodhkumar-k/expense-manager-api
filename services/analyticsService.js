const Expense = require('../models/expenses'),
      q = require('q'),
      _ = require('lodash');

const getTotalExpensesForAllMonths = (userId) => {
  const deferred = q.defer();
  Expense.aggregate([
    {$match: {userId}},
    {$unwind: "$expenses"},
    {$unwind: "$expenses.expenditure"},
    {$group: {_id: "$expenses.month", total: {$sum: "$expenses.expenditure.amount"}}}
  ], (err, res) => {
    if (err) {
      deferred.reject({ "status": 500, "jsonResult": { "result": err } });
    }
    deferred.resolve({ "status": 200, "jsonResult": { "result": res } });
  });
  return deferred.promise;
};

exports.getTotalExpensesForAllMonths = getTotalExpensesForAllMonths;

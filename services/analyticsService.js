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

const getCategoryWiseExpensesForAMonth = (userId, month) => {
  const deferred = q.defer();
  Expense.aggregate([
    {$match: {userId}},
    {$unwind: "$expenses"},
    {$match: {"expenses.month": month}},
    {$unwind: "$expenses.expenditure"},
    {$group: {_id: "$expenses.expenditure.category", total: {$sum: "$expenses.expenditure.amount"}}},
    {$sort: {total: -1}}
  ], (err, res) => {
    if (err) {
      deferred.reject({ "status": 500, "jsonResult": { "result": err } });
    }
    deferred.resolve({ "status": 200, "jsonResult": { "result": res } });
  });
  return deferred.promise;
};

const getCategoryWiseExpensesForAllMonths = (userId) => {
  const deferred = q.defer();
  Expense.aggregate([
    {$match: {userId}},
    {$unwind: "$expenses"},
    {$unwind: "$expenses.expenditure"},
    {$group: {_id: "$expenses.expenditure.category", total: {$sum: "$expenses.expenditure.amount"}}},
    {$sort: {total: -1}}
  ], (err, res) => {
    if (err) {
      deferred.reject({ "status": 500, "jsonResult": { "result": err } });
    }
    deferred.resolve({ "status": 200, "jsonResult": { "result": res } });
  });
  return deferred.promise;
};

exports.getTotalExpensesForAllMonths = getTotalExpensesForAllMonths;
exports.getCategoryWiseExpensesForAMonth = getCategoryWiseExpensesForAMonth;
exports.getCategoryWiseExpensesForAllMonths = getCategoryWiseExpensesForAllMonths;

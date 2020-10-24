const mongoose = require('mongoose'),
  q = require('q'),
  _ = require('lodash');
const Expense = require('../models/expenses');

const getExpensesByUser = (userId) => {
  const deferred = q.defer();
  Expense.find({userId}).exec((err, result) => {
    if (err) {
      deferred.reject({ "status": 500, "jsonResult": { "result": error } });
    } else {
      deferred.resolve({ "status": 200, "jsonResult": { "result": result } });
    }
  });
  return deferred.promise;
}

const getUserExpensesByMonth = (userId, month) => {
  const deferred = q.defer();
  Expense.find({userId}).exec((err, result) => {
    if (err) {
      deferred.reject({ "status": 500, "jsonResult": { "result": error } });
    } else {
      const value = result[0].expenses.find(expense => expense.month === month); // use lodash
      if (!value) {
        deferred.reject({ "status": 500, "jsonResult": { "result": "No expenses for given month" } });
      }
      deferred.resolve({ "status": 200, "jsonResult": { "result": value } });
    }
  });
  return deferred.promise;
}

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
          deferred.reject({ "status": 500, "jsonResult": { "result": error } });
        } else {
          deferred.resolve({ "status": 200, "jsonResult": { "result": result } });
        }
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
              deferred.reject({ "status": 500, "jsonResult": { "result": error } });
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

const updateExpense = (expenseDetails) => {
  const deferred = q.defer();
  const userId = expenseDetails.userId;
  Expense.find({userId}).exec((err, user) => {
    if (err) {
      deferred.reject({ "status": 500, "jsonResult": { "result": error } });
    } else if (!user.length) {
      deferred.reject({"status": 404, "jsonResult": {"result": "User not found"}});
    } else {
      const expense = _.find(user[0].expenses, {month: expenseDetails.expenses.month});
      const expenseIndex = _.findIndex(user[0].expenses, {month: expenseDetails.expenses.month});
      if (!expense) {
        deferred.reject({"status": 404, "jsonResult": {"result": "Could not find the expenses"}});
      } else {
        const expenditure = _.find(expense.expenditure, {expenseId: expenseDetails.expenses.expenditure[0].expenseId});
        const expenditureIndex = _.findIndex(expense.expenditure, {expenseId: expenseDetails.expenses.expenditure[0].expenseId});
        const updateExpenditure = expenseDetails.expenses.expenditure[0];
        expenditure.date = updateExpenditure.date;
        expenditure.category = updateExpenditure.category;
        expenditure.amount = updateExpenditure.amount;
        expenditure.details = updateExpenditure.details;

        user[0].expenses[expenseIndex]['expenditure'][expenditureIndex] = expenditure;
        user[0].markModified("expenses");
        user[0].save((error, updatedUser) => {
          if (error) {
            deferred.reject({"status": 500, "jsonResult": {"result": error}});
          } else {
            deferred.resolve({"status": 200, "jsonResult": {"result": updatedUser}});
          }
        });
      }
    }
  });
  return deferred.promise;
};

exports.addExpense = addExpense;
exports.getExpensesByUser = getExpensesByUser;
exports.getUserExpensesByMonth = getUserExpensesByMonth;
exports.updateExpense = updateExpense;

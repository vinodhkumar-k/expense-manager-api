const Expense = require('../models/expenses'),
  q = require('q'),
  _ = require('lodash');

const getExpensesByUser = (userId) => {
  const deferred = q.defer();
  Expense.find({userId}).exec((err, result) => {
    if (err) {
      deferred.reject({ "status": 500, "jsonResult": { "result": err } });
    } else {
      deferred.resolve({ "status": 200, "jsonResult": { "result": result } });
    }
  });
  return deferred.promise;
}

const getExpensesForSpecificMonth = (userId, month) => {
  const deferred = q.defer();
  Expense.find({userId}).exec((err, result) => {
    if (err) {
      deferred.reject({ "status": 500, "jsonResult": { "result": err } });
    } else {
      const expensesForMonth = _.find(result[0].expenses, {month});
      if (!expensesForMonth) {
        deferred.reject({ "status": 404, "jsonResult": { "result": "No expenses for given month" } });
      }
      deferred.resolve({ "status": 200, "jsonResult": { "result":  expensesForMonth} });
    }
  });
  return deferred.promise;
}

const addExpense = (expenseDetails) => {
  const deferred = q.defer();
  const userId = expenseDetails.userId;
  const newExpense = {...expenseDetails.expenses.expenditure[0]};
  Expense.find({userId}).exec((err, user) => {
    if (err) {
      deferred.reject({ "status": 500, "jsonResult": { "result": err } });
    } else if (!user.length) {
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
      deferred.reject({ "status": 500, "jsonResult": { "result": err } });
    } else if (!user.length) {
      deferred.reject({"status": 404, "jsonResult": {"result": "User not found"}});
    } else {
      const expense = _.find(user[0].expenses, {month: expenseDetails.expenses.month});
      const expenseIndex = _.findIndex(user[0].expenses, {month: expenseDetails.expenses.month});
      if (!expense) {
        deferred.reject({"status": 404, "jsonResult": {"result": "Could not find the expenses"}});
      } else {
        const expenditureIndex = _.findIndex(expense.expenditure, {expenseId: expenseDetails.expenses.expenditure[0].expenseId});
        user[0].expenses[expenseIndex]['expenditure'][expenditureIndex] = {...expenseDetails.expenses.expenditure[0]};
        user[0].markModified("expenses");
        user[0].save((error, updatedExpense) => {
          if (error) {
            deferred.reject({"status": 500, "jsonResult": {"result": error}});
          } else {
            deferred.resolve({"status": 200, "jsonResult": {"result": updatedExpense}});
          }
        });
      }
    }
  });
  return deferred.promise;
};

const deleteExpense = (expenseDetails) => {
  const deferred = q.defer();
  const userId = expenseDetails.userId;
  Expense.find({userId}).exec((err, user) => {
    if (err) {
      deferred.reject({ "status": 500, "jsonResult": { "result": err } });
    } else if (!user.length) {
      deferred.reject({"status": 404, "jsonResult": {"result": "User not found"}});
    } else {
      const expense = _.find(user[0].expenses, {month: expenseDetails.month});
      const expenseIndex = _.findIndex(user[0].expenses, {month: expenseDetails.month});
      if(!expense) {
        deferred.reject({"status": 404, "jsonResult": {"result": "Could not find the expenses"}});
      } else {
        _.remove(expense.expenditure, {expenseId: expenseDetails.expenseId});
        if (!expense.expenditure.length) {
          _.remove(user[0].expenses, {month: expenseDetails.month});
        } else {
          user[0].expenses[expenseIndex]["expenditure"] = expense.expenditure;
        }
        user[0].markModified("expenses");

        user[0].save((error, updatedExpense) => {
          if (error) {
            deferred.reject({"status": 500, "jsonResult": {"result": error}});
          } else {
            deferred.resolve({"status": 200, "jsonResult": {"result": updatedExpense}});
          }
        });
      }
    }
  });
  return deferred.promise;
};

exports.addExpense = addExpense;
exports.getExpensesByUser = getExpensesByUser;
exports.getExpensesForSpecificMonth = getExpensesForSpecificMonth;
exports.updateExpense = updateExpense;
exports.deleteExpense = deleteExpense;

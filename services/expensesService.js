const mongoose = require('mongoose'),
      q = require('q');
const Expense = require('../models/expenses');

const addExpense = (expenseDetails) => {
  /*let expense = new Expense(expenseDetails);
  expense.save((err, exp) => {
    console.log('saving')
    if (err) {
      return res.status(400).json(err);
    }
    return res.status(200).json(exp);
  });*/
  const deferred = q.defer();
  const userId = expenseDetails.userId;
  const newExpense = {
    expenseId: expenseDetails.expenses.expenseId,
    month: expenseDetails.expenses.month,
    date: expenseDetails.expenses.date,
    category: expenseDetails.expenses.category,
    amount: expenseDetails.expenses.amount,
    details: expenseDetails.expenses.details
  };
  Expense.find({userId: userId}).exec((err, user) => {
    console.log(user);
    console.log('---------------');
    if (err) {
      deferred.reject({"status": 500, "jsonResult": {"result": err}});
    } else if (!user.length) {
      console.log('aa');
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
      Expense.update(
        {userId: userId},
        {$push: {expenses: {month: expenseDetails.expenses.month, expenditure: [newExpense]}}},
        (error, result) => {
          console.log('bb');
          if (error) {
            deferred.reject({"status": 500, "jsonResult": {"result": error}})
          } else if (!result) {
            deferred.reject({"status": 404, "jsonResult": {"result": "Could not find the expenses"}});
          } else {
            console.log("Successfully added expense");
            console.log(mongoose.Types.ObjectId(userId));
            console.log(result);
            console.log(user);
            deferred.resolve({"status": 200, "jsonResult": {"result": result}});
          }
        }
      );
    }
  });
  /*Expense.find({userId}).exec((err, user) => {
    console.log(err);
    console.log(user[0].expenses);
  })*/
  return deferred.promise;
};

exports.addExpense = addExpense;

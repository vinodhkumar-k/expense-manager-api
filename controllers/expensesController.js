const expensesService = require('../services/expensesService');

const sendJSONResponse = (res, responseObj) => {
  res.status(responseObj.status);
  res.json(responseObj.jsonResult.result);
};

const getExpensesByUser = (req, res) => {
  expensesService.getExpensesByUser(req.params.id)
    .then(responseObj => sendJSONResponse(res, responseObj))
    .catch(responseObj => sendJSONResponse(res, responseObj));
};

const getExpensesForSpecificMonth = (req, res) => {
  expensesService.getExpensesForSpecificMonth(req.params.id, req.params.month)
  .then(responseObj => sendJSONResponse(res, responseObj))
  .catch(responseObj => sendJSONResponse(res, responseObj));
};

const addExpense = (req, res) => {
  expensesService.addExpense(req.body)
    .then(responseObj => sendJSONResponse(res, responseObj))
    .catch(responseObj => sendJSONResponse(res, responseObj));
};

const updateExpense = (req, res) => {
  expensesService.updateExpense(req.body)
    .then(responseObj => sendJSONResponse(res, responseObj))
    .catch(responseObj => sendJSONResponse(res, responseObj));
};

const deleteExpense = (req, res) => {
  const expenseDetails = {
    userId: req.params.id,
    month: req.params.month,
    expenseId: Number(req.params.expenseId)
  }
  expensesService.deleteExpense(expenseDetails)
    .then(responseObj => sendJSONResponse(res, responseObj))
    .catch(responseObj => sendJSONResponse(res, responseObj));
};

exports.getExpensesByUser = getExpensesByUser;
exports.addExpense = addExpense;
exports.getExpensesForSpecificMonth = getExpensesForSpecificMonth;
exports.updateExpense = updateExpense;
exports.deleteExpense = deleteExpense;

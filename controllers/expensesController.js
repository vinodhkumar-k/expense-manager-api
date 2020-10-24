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

const getUserExpensesByMonth = (req, res) => {
  expensesService.getUserExpensesByMonth(req.params.id, req.params.month)
  .then(responseObj => sendJSONResponse(res, responseObj))
  .catch(responseObj => sendJSONResponse(res, responseObj));
};

const addExpense = (req, res) => {
  expensesService.addExpense(req.body)
    .then(responseObj => sendJSONResponse(res, responseObj))
    .catch(responseObj => sendJSONResponse(res, responseObj));
};

exports.getExpensesByUser = getExpensesByUser;
exports.addExpense = addExpense;
exports.getUserExpensesByMonth = getUserExpensesByMonth;

const expensesService = require('../services/expensesService');

const sendJSONResponse = (res, responseObj) => {
  res.status(responseObj.status);
  res.json(responseObj.jsonResult);
};

const getExpenses = (req, res) => {
  res.json({expenses: {
    date: '16/10/2020',
    category: 'Some Category',
    amount: 1000,
    details: 'no details'
  }});
};

const getExpensesByUser = (req, res) => {
  const userId = req.params.id;
  console.log('User Id: ' + userId);
  
};

const addExpense = (req, res) => {
  expensesService.addExpense(req.body)
    .then(responseObj => sendJSONResponse(res, responseObj))
    .catch(responseObj => sendJSONResponse(res, responseObj))
};

exports.getExpenses = getExpenses;
exports.addExpense = addExpense;

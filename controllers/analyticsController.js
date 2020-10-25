const analyticsService = require('../services/analyticsService');

const sendJSONResponse = (res, responseObj) => {
  res.status(responseObj.status);
  res.json(responseObj.jsonResult.result);
};

const getTotalExpensesForAllMonths = (req, res) => {
  analyticsService.getTotalExpensesForAllMonths(Number(req.params.id))
    .then(responseObj => sendJSONResponse(res, responseObj))
    .catch(responseObj => sendJSONResponse(res, responseObj));
};

exports.getTotalExpensesForAllMonths = getTotalExpensesForAllMonths;

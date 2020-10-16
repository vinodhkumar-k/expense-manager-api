const getExpenses = (req, res) => {
  res.json({expenses: {
    date: '16/10/2020',
    category: 'Some Category',
    amount: 1000,
    details: 'no details'
  }});
};

exports.getExpenses = getExpenses;
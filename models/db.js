const mongoose = require('mongoose');

mongoose.connect("mongodb://127.0.0.1:27017/ExpenseManager", { useNewUrlParser: true }); // the url should come from config file

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'Connection error:'));

db.once('open', () => {
  console.log('Connected to MongoDB');
});

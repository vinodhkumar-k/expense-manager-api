const express = require('express'); 
const router = require('./routes/index');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

const port = process.env.PORT || 3001;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

app.use('/api', router);

// Started DB Code -- Need to move to file in models called db.js
const mongoose = require('mongoose');
mongoose.connect("mongodb://127.0.0.1:27017/ExpenseManager", { useNewUrlParser: true }); // the url should come from config file

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
  // below code should be independent 
  app.listen(port, () => {
    console.log(`Running on port ${port}`);
  });
});
// Ended DB Code
// app.listen(port, () => {
//   console.log(`Running on port ${port}`);
// });

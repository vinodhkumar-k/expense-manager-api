const mongoose = require('mongoose'),
      config = require('../config/config.json');

mongoose.connect(config.dbURI, { useNewUrlParser: true });

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'Connection error:'));

db.once('open', () => {
  console.log('Connected to MongoDB');
});

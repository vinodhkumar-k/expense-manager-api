const express = require('express'); 
const bodyParser = require('body-parser');
const cors = require('cors');
require('./models/db');

const router = require('./routes/index');
const app = express();

const port = process.env.PORT || 3001;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

app.use('/api', router);

app.listen(port, () => {
  console.log(`Running on port ${port}`);
});

const express = require('express'); 
const router = require('./routes/index');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

const port = process.env.PORT || 3001;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/api', router);

app.listen(port, () => {
  console.log(`Running on port ${port}`);
});

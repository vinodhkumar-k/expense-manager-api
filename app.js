const express = require('express'); 
const router = require('./routes/index');

const app = express();

const port = process.env.PORT || 3001;

// app.get('/', (req, res) => {
//   res.send('Welcome to expense manager api');
// });

app.use('/api', router);

app.listen(port, () => {
  console.log(`Running on port ${port}`);
});
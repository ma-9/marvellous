const express = require('express');
const app = express();
const connectDB = require('./config/dbConnect');

const port = process.env.PORT || 5000;

app.get('/', (req, res, next) => {
  res.send('API Running');
});

connectDB();

app.listen(port, (err) => {
  if (!err) {
    console.log(`Backend at : ${port}`);
  }
});

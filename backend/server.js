const express = require('express');
const app = express();
const connectDB = require('./config/dbConnect');
const cors = require('cors');

const port = process.env.PORT || 5000;

app.use(cors());

// Declare Middleware
app.use(
  express.json({
    extended: false
  })
);

app.get('/', (req, res, next) => {
  res.send('API Running');
});
// Database Connection
connectDB();

// Routes
app.use('/api/users', require('./routes/api/users'));
app.use('/api/posts', require('./routes/api/posts'));
app.use('/api/profile', require('./routes/api/profile'));
app.use('/api/auth', require('./routes/api/auth'));

app.listen(port, (err) => {
  if (!err) {
    console.log(`Backend at : ${port}`);
  }
});

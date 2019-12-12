const express = require('express');
const app = express();
const connectDB = require('./config/dbConnect');
const cors = require('cors');
const path = require('path');

const port = process.env.PORT || 5000;

app.use(cors());

// Declare Middleware
app.use(
  express.json({
    extended: false
  })
);

// Database Connection
connectDB();

// Routes
app.use('/api/users', require('./routes/api/users'));
app.use('/api/posts', require('./routes/api/posts'));
app.use('/api/profile', require('./routes/api/profile'));
app.use('/api/auth', require('./routes/api/auth'));

// Serve Static assets in production
if (process.env.NODE_ENV === 'production') {
  // Set Static Folder
  app.use(express.static('../frontend/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'));
  });
}

app.listen(port, (err) => {
  if (!err) {
    console.log(`Backend at : ${port}`);
  }
});

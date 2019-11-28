const mongoose = require('mongoose');
const config = require('config');
const mongoURL = config.get('mongoURL');

const connectDB = async () => {
  try {
    await mongoose.connect(mongoURL, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('MongoDB Connected ...');
  } catch (error) {
    console.error(error.message);
    // It Generally Exits with Failure
    process.exit(1);
  }
};

module.exports = connectDB;

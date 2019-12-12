const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: {
    type: mongoose.Schema.Types.String,
    required: true
  },
  email: {
    type: mongoose.Schema.Types.String,
    required: true,
    unique: true
  },
  password: {
    type: mongoose.Schema.Types.String,
    required: true
  },
  avatar: {
    type: mongoose.Schema.Types.String
  },
  date: {
    type: mongoose.Schema.Types.Date,
    default: Date.now
  }
});

module.exports = mongoose.model('user', UserSchema);

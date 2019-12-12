const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user'
    },
    text: {
      type: mongoose.Schema.Types.String,
      required: true
    },
    name: {
      type: mongoose.Schema.Types.String
    },
    avatar: {
      type: mongoose.Schema.Types.String
    },
    likes: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'user'
        }
      }
    ],
    comments: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'user'
        },
        text: {
          type: mongoose.Schema.Types.String,
          required: true
        },
        name: {
          type: mongoose.Schema.Types.String
        },
        avatar: {
          type: mongoose.Schema.Types.String
        },
        date: {
          type: mongoose.Schema.Types.Date,
          default: Date.now
        }
      }
    ],
    date: {
      type: mongoose.Schema.Types.Date,
      default: Date.now
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('post', PostSchema);

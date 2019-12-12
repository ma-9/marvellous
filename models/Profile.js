const mongoose = require('mongoose');
const ProfileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  },
  company: {
    type: mongoose.Schema.Types.String
  },
  website: {
    type: mongoose.Schema.Types.String
  },
  location: {
    type: mongoose.Schema.Types.String
  },
  status: {
    type: mongoose.Schema.Types.String,
    required: true
  },
  skills: {
    type: [mongoose.Schema.Types.String],
    required: true
  },
  bio: {
    type: mongoose.Schema.Types.String
  },
  githubusername: {
    type: mongoose.Schema.Types.String
  },
  experience: [
    {
      title: {
        type: mongoose.Schema.Types.String,
        required: true
      },
      company: {
        type: mongoose.Schema.Types.String,
        required: true
      },
      location: {
        type: mongoose.Schema.Types.String
      },
      from: {
        type: mongoose.Schema.Types.Date,
        required: true
      },
      to: {
        type: mongoose.Schema.Types.Date
      },
      current: {
        type: mongoose.Schema.Types.Boolean,
        default: false
      },
      description: {
        type: mongoose.Schema.Types.String
      }
    }
  ],
  education: [
    {
      school: {
        type: mongoose.Schema.Types.String,
        required: true
      },
      degree: {
        type: mongoose.Schema.Types.String,
        required: true
      },
      fieldofstudy: {
        type: mongoose.Schema.Types.String,
        required: true
      },
      from: {
        type: mongoose.Schema.Types.Date,
        required: true
      },
      to: {
        type: mongoose.Schema.Types.Date
      },
      current: {
        type: mongoose.Schema.Types.Boolean,
        default: false
      },
      description: {
        type: mongoose.Schema.Types.String
      }
    }
  ],
  youtube: {
    type: mongoose.Schema.Types.String
  },
  twitter: {
    type: mongoose.Schema.Types.String
  },
  facebook: {
    type: mongoose.Schema.Types.String
  },
  linkedin: {
    type: mongoose.Schema.Types.String
  },
  instagram: {
    type: mongoose.Schema.Types.String
  },
  date: {
    type: mongoose.Schema.Types.Date,
    default: Date.now
  }
});

module.exports = mongoose.model('profile', ProfileSchema);

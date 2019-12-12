const router = require('express').Router();
const auth = require('../../middlewares/auth');
const Profile = require('../../models/Profile');
const User = require('../../models/User');
const Post = require('../../models/Post');
const { check, validationResult } = require('express-validator');
const config = require('config');
const request = require('request');

// @route   GET api/profile/me
// @desc    Get Individual Profile Details
// @access  Private
router.get('/me', auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.user.id
    }).populate('user', ['name', 'avatar']);

    if (!profile) {
      return res.status(400).json({
        msg: 'There is no Profile For This User'
      });
    }

    res.json(profile);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({
      msg: 'Server Error',
      error: error
    });
  }
});

// @route   POST api/profile/
// @desc    Create Profile or Update if Exists
// @access  Private
router.post(
  '/',
  auth,
  [
    check('status', 'Status is Required').notEmpty(),
    check('skills', 'Skills are Required').notEmpty()
  ],
  async (req, res) => {
    const error = validationResult(req);

    if (!error.isEmpty()) {
      return res.status(400).json({
        errors: error.array()
      });
    }

    const {
      company,
      website,
      location,
      status,
      skills,
      bio,
      githubusername,
      youtube,
      twitter,
      facebook,
      linkedin,
      instagram
    } = req.body;

    // Generate Profile Object
    const profileFields = {};
    profileFields.user = req.user.id;
    if (company) profileFields.company = company;
    if (website) profileFields.website = website;
    if (location) profileFields.location = location;
    if (status) profileFields.status = status;
    if (bio) profileFields.bio = bio;
    if (githubusername) profileFields.githubusername = githubusername;
    if (skills) {
      profileFields.skills = skills.split(',').map((skill) => skill.trim());
    }

    // Generate Social Object
    profileFields.social = {};
    if (youtube) profileFields.youtube = youtube;
    if (twitter) profileFields.twitter = twitter;
    if (facebook) profileFields.facebook = facebook;
    if (linkedin) profileFields.linkedin = linkedin;
    if (instagram) profileFields.instagram = instagram;
    try {
      let profile = await Profile.findOne({ user: req.user.id });

      if (profile) {
        await Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: profileFields },
          { new: true }
        );
        return res.json(profile);
      }

      profile = new Profile(profileFields);
      await profile.save();
      res.json(profile);
    } catch (err) {
      console.error(err.message);
      res.status(500).json({
        error: 'Server Error'
      });
    }
  }
);

// @route   GET api/profile/
// @desc    Get All Profiles
// @access  Public
router.get('/', async (req, res) => {
  try {
    const profiles = await Profile.find().populate('user', ['name', 'avatar']);
    if (!profiles) {
      return res.status(404).json({
        msg: 'No More Profiles..'
      });
    }
    res.json(profiles);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({
      msg: 'Server Error',
      error: err
    });
  }
});

// @route   GET api/profile/:user_id
// @desc    Get profile by User ID
// @access  Public
router.get('/:user_id', async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.params.user_id
    }).populate('user', ['name', 'avatar']);
    if (!profile) {
      return res.status(404).json({
        msg: 'Profile not found !'
      });
    }
    res.json(profile);
  } catch (err) {
    console.error(err.message);
    if (err.kind == 'ObjectId') {
      return res.status(404).json({
        msg: 'Profile not found !'
      });
    }
    res.status(500).json({
      msg: 'Server Error',
      errors: err.message
    });
  }
});

// @route   DELETE api/profile
// @desc    Delete User with Profile and Posts
// @access  Private
router.delete('/', auth, async (req, res) => {
  try {
    await Post.deleteMany({ user: req.user.id });
    await User.findOneAndRemove({ _id: req.user.id });
    await Profile.findOneAndRemove({ user: req.user.id });
    res.json({
      msg: 'User Deleted'
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({
      msg: 'Server Error',
      error: err.message
    });
  }
});

// @route   PUT api/profile
// @desc    Add Profile Experience
// @access  Public
router.put(
  '/experience',
  auth,
  [
    check('title', 'Title is Required').notEmpty(),
    check('company', 'Company Name is Required').notEmpty(),
    check('from', 'From date is Required').notEmpty()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array()
      });
    }

    const {
      title,
      company,
      location,
      from,
      to,
      current,
      description
    } = req.body;

    const newExp = {
      title,
      company,
      location,
      from,
      to,
      current,
      description
    };

    try {
      const profile = await Profile.findOne({ user: req.user.id });
      profile.experience.unshift(newExp);
      await profile.save();
      res.json(profile);
    } catch (err) {
      console.error(err.message);
      res.status(500).json({
        msg: 'Server Error',
        error: err.message
      });
    }
  }
);

// @route   DELETE api/profile/:exp_id
// @desc    Delete Experience Using Exp ID
// @access  Public
router.delete('/experience/:exp_id', auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id });

    const removeIndex = await profile.experience
      .map((item) => item.id)
      .indexOf(req.params.exp_id);

    profile.experience.splice(removeIndex, 1);
    await profile.save();

    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({
      msg: 'Server Error'
    });
  }
});

// @route   PUT api/profile
// @desc    Add Profile Education
// @access  Public
router.put(
  '/education',
  auth,
  [
    check('school', 'School is Required').notEmpty(),
    check('degree', 'Degree Name is Required').notEmpty(),
    check('fieldofstudy', 'Field of Study is Required').notEmpty()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array()
      });
    }

    const {
      school,
      degree,
      fieldofstudy,
      from,
      to,
      current,
      description
    } = req.body;

    const newEdu = {
      school,
      degree,
      fieldofstudy,
      from,
      to,
      current,
      description
    };

    try {
      const profile = await Profile.findOne({ user: req.user.id });
      profile.education.unshift(newEdu);
      await profile.save();
      res.json(profile);
    } catch (err) {
      console.error(err.message);
      res.status(500).json({
        msg: 'Server Error',
        error: err.message
      });
    }
  }
);

// @route   DELETE api/profile/:edu_id
// @desc    Delete Education Using Edu ID
// @access  Public
router.delete('/education/:edu_id', auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id });

    const removeIndex = await profile.education
      .map((item) => item.id)
      .indexOf(req.params.edu_id);

    profile.education.splice(removeIndex, 1);
    await profile.save();

    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({
      msg: 'Server Error'
    });
  }
});

// @route   GET api/profile/github/:username
// @desc    Get Repositories from Github Username
// @access  Public
router.get('/github/:username', (req, res) => {
  try {
    const options = {
      url: `https://api.github.com/users/${
        req.params.username
      }/repos?per_page=5&sort=created:asc&client_id=${config.get(
        'githubClientId'
      )}&client_secret=${config.get('githubSecret')}`,
      method: 'GET',
      headers: { 'user-agent': 'node.js' }
    };

    request(options, (err, response, body) => {
      if (err) {
        console.error(err);
      }

      if (response.statusCode !== 200) {
        return res.status(404).json({
          msg: 'No Github Profile Found'
        });
      }

      res.json(JSON.parse(body));
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({
      msg: 'Server Error'
    });
  }
});

module.exports = router;

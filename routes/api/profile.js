const router = require('express').Router();
const auth = require('../../middlewares/auth');
const Profile = require('../../models/Profile');
const { check, validationResult } = require('express-validator');

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

module.exports = router;

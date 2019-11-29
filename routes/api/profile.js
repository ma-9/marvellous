const router = require('express').Router();
const auth = require('../../middlewares/auth');
const Profile = require('../../models/Profile');

// @route   GET api/profile/me
// @desc    Get Individual Profile Details
// @access  Private
router.get('/me', auth, async (req, res, next) => {
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

module.exports = router;

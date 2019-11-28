const router = require('express').Router();
const auth = require('../../middlewares/auth');
const User = require('../../models/User');

// @route   GET api/auth
// @desc    test auth
// @access  public
router.get('/', auth, async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;

const router = require('express').Router();

// @route   api/profile
// @desc    test profile
// @access  public
router.get('/', (req, res, next) => {
  res.send('profile Route');
});

module.exports = router;

const router = require('express').Router();

// @route   GET api/auth
// @desc    test auth
// @access  public
router.get('/', (req, res, next) => {
  res.send('auth Route');
});

module.exports = router;
const router = require('express').Router();

// @route   api/users
// @desc    test Users
// @access  public
router.get('/', (req, res, next) => {
  res.send('User Route');
});

module.exports = router;

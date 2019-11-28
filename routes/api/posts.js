const router = require('express').Router();

// @route   api/posts
// @desc    test posts
// @access  public
router.get('/', (req, res, next) => {
  res.send('posts Route');
});

module.exports = router;

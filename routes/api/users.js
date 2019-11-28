const router = require('express').Router();
const { check, validationResult } = require('express-validator');

// @route   POST api/users
// @desc    test Users
// @access  public
router.post(
  '/',
  [
    check('name', 'Please Enter a Name').notEmpty(),
    check('email', 'Invalid Email').isEmail(),
    check(
      'password',
      'Please enter password with 6 or more characters'
    ).isLength({ min: 6 })
  ],
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.json({
        error: errors.array()
      });
    } else {
      res.send('User Route');
    }
  }
);

module.exports = router;

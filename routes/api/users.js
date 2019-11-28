const router = require('express').Router();
const { check, validationResult } = require('express-validator');
const User = require('../../models/User');
const gravater = require('gravatar');
const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');

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
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        error: errors.array()
      });
    }

    const { name, email, password } = req.body;

    try {
      // See if User Exists
      let user = await User.findOne({ email: email });

      if (user) {
        return res.status(400).json({
          msg: 'User Already Exists'
        });
      }

      // Get Users Gravatar
      const avatar = gravater.url(email, {
        s: '200',
        r: 'pg',
        d: 'mm'
      });

      user = new User({
        name,
        email,
        avatar,
        password
      });

      // Password Encryption
      const Salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, Salt);

      await user.save();

      // Return JSON Web Token
      const payload = {
        user: {
          id: user.id
        }
      };

      jwt.sign(
        payload,
        config.get('jwtSecret'),
        { expiresIn: 3600 },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

module.exports = router;

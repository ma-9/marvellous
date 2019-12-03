const router = require('express').Router();
const auth = require('../../middlewares/auth');
const User = require('../../models/User');
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');

// @route   GET api/auth
// @desc    Authenticate User via Token and Show User Details as response
// @access  private
router.get('/', auth, async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});

// @route   POST api/auth
// @desc    Logging in to get Token
// @access  public
router.post('/', async (req, res, next) => {
  const { email, password } = req.body;

  try {
    // See if User Exists
    let user = await User.findOne({ email: email });

    if (!user) {
      return res.status(400).json([
        {
          msg: 'Invalid Credentials'
        }
      ]);
    }

    const isMatched = await bcrypt.compare(password, user.password);

    if (!isMatched) {
      return res.status(400).json([
        {
          msg: 'Invalid Credentials'
        }
      ]);
    }

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
});

module.exports = router;

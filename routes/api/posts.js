const router = require('express').Router();
const auth = require('../../middlewares/auth');
const { check, validationResult } = require('express-validator');

const User = require('../../models/User');
const Profile = require('../../models/Profile');
const Post = require('../../models/Post');

// @route   POST api/posts
// @desc    Add New Posts
// @access  Private
router.post(
  '/',
  auth,
  [check('text', 'Text Is Required').notEmpty()],
  async (req, res, next) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
      return res.status(400).json({
        errors: error.array()
      });
    }

    try {
      const user = await User.findById(req.user.id).populate('-password');

      const newPost = new Post({
        text: req.body.text,
        name: user.name,
        avatar: user.avatar,
        user: req.user.id
      });

      const post = await newPost.save();

      res.json(post);
    } catch (err) {
      console.error(err.message);
      res.status(500).json({
        msg: 'Server Error',
        error: err.message
      });
    }
  }
);

module.exports = router;

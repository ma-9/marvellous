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

// @route   GET api/posts
// @desc    get all posts
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    const posts = await Post.find().sort({ date: -1 });
    if (!posts) {
      return res.status(404).json({
        msg: 'No Posts Found'
      });
    }
    res.json(posts);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({
      msg: 'SERVER ERROR',
      error: err.message
    });
  }
});

// @route   GET api/posts/:post_id
// @desc    get single post by id
// @access  Private
router.get('/:post_id', auth, async (req, res) => {
  try {
    const post = await Post.findOne({ _id: req.params.post_id });
    if (!post) {
      return res.status(404).json({
        msg: 'No Post Found'
      });
    }
    res.json(post);
  } catch (err) {
    console.error(err.message);
    if (err.kind == 'ObjectId') {
      return res.status(404).json({
        msg: 'No Post Found'
      });
    }
    res.status(500).json({
      msg: 'SERVER ERROR',
      error: err.message
    });
  }
});

// @route   DELETE api/posts/:post_id
// @desc    Delete single post by id
// @access  Private
router.delete('/:post_id', auth, async (req, res) => {
  try {
    const result = await Post.findOneAndRemove({ _id: req.params.post_id });

    if (!result) {
      return res.status(400).json({
        msg: 'No Post Available To Delete'
      });
    }

    if (result.user.id === req.user.id) {
      return res.status(401).json({ msg: 'User Not Authorized' });
    }

    res.json({
      msg: 'POST DELETED'
    });
  } catch (err) {
    console.error(err.message);
    if (err.kind == 'ObjectId') {
      return res.status(404).json({
        msg: 'No Post Available To Delete'
      });
    }
    res.status(500).json({
      msg: 'SERVER ERROR',
      error: err.message
    });
  }
});

module.exports = router;
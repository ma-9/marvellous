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

    if (result.user.toString() === req.user.id) {
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

// @route   PUT api/posts/likes/:post_id
// @desc    Like a Post
// @access  Private
router.put('/likes/:post_id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.post_id);

    if (
      post.likes.filter((like) => like.user.toString() === req.user.id).length >
      0
    ) {
      return res.status(400).json({
        msg: 'Post Already Liked'
      });
    }

    post.likes.unshift({ user: req.user.id });

    await post.save();

    res.json(post.likes);
  } catch (err) {
    console.error(err.message);
    if (err.kind == 'ObjectId') {
      return res.status(404).json({
        msg: 'No Post Available To Like'
      });
    }
    res.status(500).json({
      msg: 'SERVER ERROR',
      error: err.message
    });
  }
});

// @route   PUT api/posts/unlikes/:post_id
// @desc    Un Like a Post
// @access  Private
router.put('/unlikes/:post_id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.post_id);

    if (
      post.likes.filter((like) => like.user.toString() === req.user.id)
        .length === 0
    ) {
      return res.status(400).json({
        msg: 'Post has not yet Liked'
      });
    }

    const removeIndex = post.likes
      .map((like) => like.user.toString())
      .indexOf(req.user.id);

    post.likes.splice(removeIndex, 1);

    await post.save();

    res.json(post.likes);
  } catch (err) {
    console.error(err.message);
    if (err.kind == 'ObjectId') {
      return res.status(404).json({
        msg: 'No Post Available To UnLike'
      });
    }
    res.status(500).json({
      msg: 'SERVER ERROR',
      error: err.message
    });
  }
});

// @route   POST api/posts/comment/:post_id
// @desc    Add Comment of Post
// @access  Private
router.post(
  '/comment/:post_id',
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
      const post = await Post.findById(req.params.post_id);

      const newComment = {
        text: req.body.text,
        name: user.name,
        avatar: user.avatar,
        user: req.user.id
      };

      post.comments.unshift(newComment);

      await post.save();

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

// @route   DELETE api/posts/comment/:post_id/:comment_id
// @desc    Delete Comment from Post
// @access  Private
router.delete('/comment/:post_id/:comment_id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.post_id);

    // Find Comments
    const comment = post.comments.find(
      (comment) => comment.id === req.params.comment_id
    );

    // If No comments to delete
    if (!comment) {
      return res.status(400).json({
        msg: 'No comment found to delete'
      });
    }

    // Authorize User to delete Comment
    if (comment.user.toString() !== req.user.id) {
      return res.status(401).json({
        msg: 'User Unauthorized'
      });
    }

    const removeIndex = post.comments
      .map((comment) => comment.user.toString())
      .indexOf(req.user.id);

    post.comments.splice(removeIndex, 1);

    await post.save();

    res.json(post.comments);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({
      msg: 'Server Error',
      error: err.message
    });
  }
});

module.exports = router;

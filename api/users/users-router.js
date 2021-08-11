const express = require('express');
const User = require('./users-model');
const Post = require('../posts/posts-model');

// You will need `users-model.js` and `posts-model.js` both
// The middleware functions also need to be required
const { validateUserId, validateUser, validatePost } = require('../middleware/middleware');

const router = express.Router();

router.get('/', async (req, res) => {
  // RETURN AN ARRAY WITH ALL THE USERS
  const users = await User.get();
  res.status(200).json(users);
});

router.get('/:id', async (req, res) => {
  // RETURN THE USER OBJECT
  const user = await User.getById(req.user.id);
  res.status(200).json(user);
  // this needs a middleware to verify user id
});

router.post('/', async (req, res) => {
  // RETURN THE NEWLY CREATED USER OBJECT
  // this needs a middleware to check that the request body is valid
  await User.insert(req.body);
  res.status(200).json(req.body);
});

router.put('/:id', validateUserId, validateUser, async  (req, res) => {
  // RETURN THE FRESHLY UPDATED USER OBJECT
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
  await User.update(req.user.id, req.body)
  res.status(200).json(req.user);
});

router.delete('/:id', async (req, res) => {
  // RETURN THE FRESHLY DELETED USER OBJECT
  // this needs a middleware to verify user id
  await User.remove(req.user.id)
  res.status(200).json(req.user);
});

router.get('/:id/posts', async (req, res) => {
  // RETURN THE ARRAY OF USER POSTS
  // this needs a middleware to verify user id
  const userPosts = await User.getUserPosts(req.user.id);
  res.status(200).json(userPosts);
});

router.post('/:id/posts', validateUserId, validatePost, async (req, res) => {
  // RETURN THE NEWLY CREATED USER POST
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
  const post = {
    text: req.body.text,
    user_id: req.user.id,
  };
  const newPost = await Post.insert(post);
  res.status(200).json(newPost);
});

// do not forget to export the router

module.exports = router;

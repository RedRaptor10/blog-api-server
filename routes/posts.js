const express = require('express');
const router = express.Router();

// Controller
const postController = require('../controllers/postController');

// Get All Posts
router.get('/', postController.getPosts);

// Get Single Post
router.get('/:postId', postController.getPost);

// Get Post Comments
router.get('/:postId/comments', postController.getPostComments);

module.exports = router;
const express = require('express');
const router = express.Router();

// Controllers
const postController = require('../controllers/postController');
const commentController = require('../controllers/commentController');

// Get All Posts
router.get('/', postController.getPosts);

// Get Single Post
router.get('/:postId', postController.getPost);

// Get Post Comments
router.get('/:postId/comments', commentController.getPostComments);

// Create Post
router.post('/create', postController.createPost);

// Create Post Comment
router.post('/:postId/comments/create', commentController.createPostComment);

module.exports = router;
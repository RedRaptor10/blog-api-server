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

// Update Post
router.post('/:postId/update', postController.updatePost);

// Update Post Comment
router.post('/:postId/comments/:commentId/update', commentController.updatePostComment);

// Delete Post
router.post('/:postId/delete', postController.deletePost);

// Delete Post Comment
router.post('/:postId/comments/:commentId/delete', commentController.deletePostComment);

module.exports = router;
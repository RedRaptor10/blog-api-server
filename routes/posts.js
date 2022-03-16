const express = require('express');
const router = express.Router();
const passport = require('passport');

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
router.post('/create',
    passport.authenticate('jwt', {session: false}),
    postController.checkAuth,
    postController.createPost);

// Create Post Comment
// NOTE: Do not need checkAuth middleware because any user is allowed to create a post comment
router.post('/:postId/comments/create',
    passport.authenticate('jwt', {session: false}),
    commentController.createPostComment);

// Update Post
router.post('/:postId/update',
    passport.authenticate('jwt', {session: false}),
    postController.checkAuth,
    postController.updatePost);

// Update Post Comment
router.post('/:postId/comments/:commentId/update',
    passport.authenticate('jwt', {session: false}),
    commentController.checkAuth,
    commentController.updatePostComment);

// Delete Post
router.post('/:postId/delete',
    passport.authenticate('jwt', {session: false}),
    postController.checkAuth,
    postController.deletePost);

// Delete Post Comment
router.post('/:postId/comments/:commentId/delete',
    passport.authenticate('jwt', {session: false}),
    commentController.checkAuth,
    commentController.deletePostComment);

module.exports = router;
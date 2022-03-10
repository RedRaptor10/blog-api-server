const express = require('express');
const router = express.Router();

// Controller
const postController = require('../controllers/postController');
const commentController = require('../controllers/commentController');

// Posts
router.get('/', postController.getPosts);

// Post Comments
router.get('/:postId/comments', commentController.getPostComments);

module.exports = router;
const express = require('express');
const router = express.Router();

// Controller
const commentController = require('../controllers/commentController');

// Get All Comments
router.get('/', commentController.getComments);

// Get Single Comment
router.get('/:commentId', commentController.getComment);

module.exports = router;
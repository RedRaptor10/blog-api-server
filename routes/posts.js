const express = require('express');
const router = express.Router();

// Controller
const postController = require('../controllers/postController');

// Posts
router.get('/', postController.getPosts);

module.exports = router;
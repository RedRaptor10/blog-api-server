const express = require('express');
const router = express.Router();

// Controller
const commentController = require('../controllers/commentController');

// Comments
router.get('/', commentController.getComments);

module.exports = router;
const express = require('express');
const router = express.Router();

// Controller
const indexController = require('../controllers/indexController');

// Index
router.get('/', indexController.index);

module.exports = router;
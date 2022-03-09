const express = require('express');
const router = express.Router();

// Controller
const userController = require('../controllers/userController');

// Users
router.get('/', userController.getUsers);

module.exports = router;
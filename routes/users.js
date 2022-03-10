const express = require('express');
const router = express.Router();

// Controller
const userController = require('../controllers/userController');

// Get All Users
router.get('/', userController.getUsers);

// Get Single User
router.get('/:username', userController.getUser);

// Create User
router.post('/create', userController.createUser);

module.exports = router;
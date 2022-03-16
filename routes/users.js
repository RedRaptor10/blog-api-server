const express = require('express');
const router = express.Router();
const passport = require('passport');

// Controller
const userController = require('../controllers/userController');

// Get All Users
router.get('/', userController.getUsers);

// Get Single User
router.get('/:username', userController.getUser);

// Create User
router.post('/create', userController.createUser);

// Update User
router.post('/:username/update',
    passport.authenticate('jwt', {session: false}), // Check user login
    userController.checkAuth, // Check if user is an admin or self
    userController.updateUser);

// Delete User
router.post('/:username/delete',
    passport.authenticate('jwt', {session: false}),
    userController.checkAuth,
    userController.deleteUser);

module.exports = router;
const User = require('../models/user');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');

// Checks if user is authorized
exports.checkAuth = (req, res, next) => {
    // Allow authorization if user is an admin OR if URL contains username
    if (req.user.info.role == 'admin' || req.user.info.username == req.params.username) {
        return next();
    } else {
        return res.json({message: 'Unauthorized'});
    }
};

// Get Users
exports.getUsers = function(req, res, next) {
    let sortby = '_id';
    let orderby = 'ascending';

    if (req.query.sort == 'username') { sortby = 'username'; }
    if (req.query.order == 'desc') { orderby = 'descending'; }

    User.find({}, { 'password': 0} ) // Exclude password from db query
    .sort({ [sortby]: orderby }) // Sort by (Default: id in ascending order)
    .exec(function(err, results) {
        if (err) { return next(err); }
        res.json(results);
    });
};

// Get User
exports.getUser = function(req, res, next) {
    User.findOne({'username': req.params.username }, {'password': 0 }) // Exclude password from db query
    .exec(function(err, results) {
        if (err) { return next(err); }
        res.json(results);
    });
};

// Create User
exports.createUser = [
    // Validate and sanitize fields
    body('username').trim().isLength({ min: 1 }).escape().withMessage('Username required.')
        .isLength({ max: 20 }).withMessage('Username must have 20 characters or less.'),
    body('password', 'Password must contain at least 5 characters.').trim().isLength({ min: 5 }).escape(),
    body('confirmPassword', 'Passwords do not match.').trim().escape().custom((value, { req }) => value === req.body.password),

    // Process Sign Up
    (req, res, next) => {
        // Extract the validation errors from request
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            res.json({ username: req.body.username, errors: errors.array() });
        } else {
            const user = new User({
                username: req.body.username,
                password: req.body.password,
                role: req.body.role
            });

            // Check if username already exists
            User.findOne({ 'username': user.username })
            .exec(function(err, results) {
                if (err) { return next(err); }
                else if (results) {
                    res.json({ message: 'Username already exists.' });
                } else {
                    // Hash password
                    bcrypt.hash(user.password, 10, (err, hashedPassword) => {
                        if (err) { return next(err); }
                        user.password = hashedPassword;
    
                        // Save user info to database
                        user.save(function(err) {
                            if (err) { return next(err); }
                            res.json({
                                user: {
                                    'id': user._id,
                                    username: user.username,
                                    role: user.role
                                },
                                message: 'Success'
                            });
                        });
                    });
                }
            });
        }
    }
];

// Update User
exports.updateUser = [
    (req, res, next) => {
        const user = new User({
            username: req.body.username,
            password: req.body.password,
            role: req.body.role
        });

        // Check if username already exists AND is not same as previous username
        User.findOne({ 'username': user.username })
        .exec(function(err, results) {
            if (err) { return next(err); }
            else if (results && results.username != req.params.username) {
                res.json({ message: 'Username already exists.' });
            } else {
                // Hash password
                bcrypt.hash(user.password, 10, (err, hashedPassword) => {
                    if (err) { return next(err); }
                    user.password = hashedPassword;

                    // Update user info from database
                    User.findOneAndUpdate(
                        { 'username': req.params.username }, // Filter
                        { 'username': user.username, 'password': user.password, 'role': user.role }, // New values
                        function(err) {
                            if (err) { return next(err); }
                            res.json({
                                user: {
                                    'id': user._id,
                                    username: user.username,
                                    role: user.role
                                },
                                message: 'Success'
                            });
                        }
                    );
                });
            }
        });
    }
];

// Delete User
exports.deleteUser = [
    (req, res, next) => {
        User.findOneAndRemove({ 'username': req.params.username }, function(err) {
            if (err) { return next(err); }
            res.json({
                message: 'Success'
            });
        });
    }
];
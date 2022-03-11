const User = require('../models/user');
const bcrypt = require('bcryptjs');

// Get Users
exports.getUsers = function(req, res, next) {
    User.find({}, { 'password': 0} ) // Exclude password from db query
    .sort({ '_id': 1 }) // Sort by id in ascending order
    .exec(function(err, results) {
        if (err) { return next(err); }
        res.json(results);
    });
};

// Get User
exports.getUser = function(req, res, next) {
    User.find({'username': req.params.username }, {'password': 0 }) // Exclude password from db query
    .exec(function(err, results) {
        if (err) { return next(err); }
        res.json(results);
    });
};

// Create User
exports.createUser = [
    (req, res, next) => {
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
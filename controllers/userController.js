const User = require('../models/user');

// Get Users
exports.getUsers = function(req, res, next) {
    User.find({}, { 'password': 0} ) // Exclude password from db query
    .sort({ '_id': 1 }) // Sort by id in ascending order
    .exec(function(err, results) {
        if (err) { return next(err); }
        res.json(results);
    });
};
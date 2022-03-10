const Post = require('../models/post');

// Get Posts
exports.getPosts = function(req, res, next) {
    Post.find({})
    .sort({ '_id': 1 }) // Sort by id in ascending order
    .populate('author', { 'password': 0 }) // Exclude password from db query
    .populate('comments')
    .exec(function(err, results) {
        if (err) { return next(err); }
        res.json(results);
    });
};
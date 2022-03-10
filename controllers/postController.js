const Post = require('../models/post');
const Comment = require('../models/comment');

// Get Posts
exports.getPosts = function(req, res, next) {
    Post.find({})
    .sort({ '_id': 1 }) // Sort by id in ascending order
    .populate('author', { 'password': 0 }) // Exclude password from db query
    .exec(function(err, results) {
        if (err) { return next(err); }
        res.json(results);
    });
};

// Get Post
exports.getPost = function(req, res, next) {
    Post.find({ '_id': req.params.postId })
    .populate('author', { 'password': 0 }) // Exclude password from db query
    .exec(function(err, results) {
        if (err) { return next(err); }
        res.json(results);
    });
};

// Get Post Comments
exports.getPostComments = function(req, res, next) {
    Comment.find({'post': req.params.postId })
    .sort({ '_id': 1 }) // Sort by id in ascending order
    .populate('author', { 'password': 0 }) // Exclude password from db query
    .exec(function(err, results) {
        if (err) { return next(err); }
        res.json(results);
    });
};
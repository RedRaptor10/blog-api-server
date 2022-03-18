const Post = require('../models/post');
const Comment = require('../models/comment');

// Checks if user is authorized
exports.checkAuth = (req, res, next) => {
    // Allow authorization if user is an admin
    if (req.user.info.role == 'admin') {
        return next();
    } else {
        return res.json({message: 'Unauthorized'});
    }
};

// Get Posts
exports.getPosts = function(req, res, next) {
    let sortby = '_id';
    let orderby = 'ascending';

    if (req.query.sort == 'title') { sortby = 'title'; }
    if (req.query.sort == 'date') { sortby = 'date'; }
    if (req.query.order == 'desc') { orderby = 'descending'; }

    Post.find({})
    .sort({ [sortby]: orderby }) // Sort by (Default: id in ascending order)
    .populate('author', { 'password': 0 }) // Exclude password from db query
    .exec(function(err, results) {
        if (err) { return next(err); }
        res.json(results);
    });
};

// Get Post
exports.getPost = function(req, res, next) {
    Post.findOne({ '_id': req.params.postId })
    .populate('author', { 'password': 0 }) // Exclude password from db query
    .exec(function(err, results) {
        if (err) { return next(err); }
        res.json(results);
    });
};

// Create Post
exports.createPost = [
    (req, res, next) => {
        const post = new Post ({
            title: req.body.title,
            author: req.body.author,
            date: req.body.date,
            content: req.body.content,
            published: true
        });

        // Save post to database
        post.save(function(err) {
            if (err) { return next(err); }
            res.json({
                post: {
                    'id': post._id,
                    title: post.title,
                    author: post.author._id,
                    date: post.date,
                    content: post.content,
                    published: post.published
                },
                message: 'Success'
            });
        });
    }
];

// Update Post
exports.updatePost = [
    (req, res, next) => {
        const post = new Post ({
            _id: req.params.postId,
            title: req.body.title,
            author: req.body.author,
            date: req.body.date,
            content: req.body.content,
            published: true
        });

        // Save post to database
        Post.findByIdAndUpdate(req.params.postId, post, { new: true }, function(err, results) {
            if (err) { return next(err); }
            res.json({
                post: results,
                message: 'Success'
            });
        });
    }
];

// Delete Post
exports.deletePost = [
    (req, res, next) => {
        Post.findByIdAndRemove(req.params.postId, function(err) {
            if (err) { return next(err); }
            res.json({
                message: 'Success'
            });
        });
    }
];
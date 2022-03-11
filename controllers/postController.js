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
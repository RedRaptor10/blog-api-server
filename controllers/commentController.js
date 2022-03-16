const Comment = require('../models/comment');

// Checks if user is authorized
exports.checkAuth = (req, res, next) => {
    // Allow authorization if user is an admin
    if (req.user.info.role == 'admin') {
        return next();
    }

    // Get Comment
    Comment.findOne({ '_id': req.params.commentId })
    .populate('author', { 'password': 0 }) // Exclude password from db query
    .exec(function(err, results) {
        if (err) { return next(err); }
        // Allow authorization if user is equal to comment author
        if (req.user.info.username == results.author.username) {
            return next();
        } else {
            return res.json({message: 'Unauthorized'});
        }
    });
}

// Get Comments
exports.getComments = function(req, res, next) {
    Comment.find({})
    .sort({ '_id': 1 }) // Sort by id in ascending order
    .populate('author', { 'password': 0 }) // Exclude password from db query
    .exec(function(err, results) {
        if (err) { return next(err); }
        res.json(results);
    });
};

// Get Comment
exports.getComment = function(req, res, next) {
    Comment.findOne({ '_id': req.params.commentId })
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

// Create Comment
exports.createPostComment = [
    (req, res, next) => {
        const comment = new Comment ({
            post: req.params.postId,
            author: req.body.author,
            date: req.body.date,
            content: req.body.content
        });

        // Save comment to database
        comment.save(function(err) {
            if (err) { return next(err); }
            res.json({
                comment: {
                    'id': comment._id,
                    post: comment.post._id,
                    author: comment.author._id,
                    date: comment.date,
                    content: comment.content
                },
                message: 'Success'
            });
        });
    }
];

// Update Comment
exports.updatePostComment = [
    (req, res, next) => {
        const comment = new Comment ({
            _id: req.params.commentId,
            post: req.params.postId,
            author: req.body.author,
            date: req.body.date,
            content: req.body.content
        });

        // Save comment to database
        Comment.findByIdAndUpdate(req.params.commentId, comment, { new: true }, function(err, results) {
            if (err) { return next(err); }
            res.json({
                comment: results,
                message: 'Success'
            });
        });
    }
];

// Delete Comment
exports.deletePostComment = [
    (req, res, next) => {
        Comment.findByIdAndRemove(req.params.commentId, function(err) {
            if (err) { return next(err); }
            res.json({
                message: 'Success'
            });
        });
    }
];
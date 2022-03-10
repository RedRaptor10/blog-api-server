const Comment = require('../models/comment');

// Get Comments
exports.getComments = function(req, res, next) {
    Comment.find({})
    .sort({ '_id': 1 }) // Sort by id in ascending order
    .populate('author', { 'password': 0 }) // Exclude password from db query
    .exec(function(err, results) {
        if (err) { res.json({ error: err.message }) }//return next(err.message); }
        res.json(results);
    });
};
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CommentSchema = new Schema({
    author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    date: { type: Date, required: true },
    content: { type: String, minLength: 1, required: true }
});

CommentSchema
.virtual('url')
.get(function() {
    return '/comment/' + this._id;
});

module.exports = mongoose.model('Comment', CommentSchema);
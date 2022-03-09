var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PostSchema = new Schema({
    title: { type: String, minLength: 1, maxLength: 100, required: true },
    author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    date: { type: Date, required: true },
    content: { type: String, minLength: 1, required: true },
    comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }]
});

PostSchema
.virtual('url')
.get(function() {
    return '/post/' + this._id;
});

module.exports = mongoose.model('Post', PostSchema);
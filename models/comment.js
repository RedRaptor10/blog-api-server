var mongoose = require('mongoose');
var Schema = mongoose.Schema;
const { DateTime } = require('luxon');

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

// Virtual for comment date formatted
CommentSchema
.virtual('dateFormatted')
.get(function() {
    return DateTime.fromJSDate(this.date).toLocaleString(DateTime.DATETIME_MED);
});

module.exports = mongoose.model('Comment', CommentSchema);
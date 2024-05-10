const mongoose = require('mongoose');
const { Schema } = mongoose;

const commentSchema = new Schema({
    post: {
        type: Schema.Types.ObjectId,
        ref: 'Post',
        required: true
    },
    commenter: {
        type: Schema.Types.ObjectId,
        ref: 'Author',
        required: true
    },
    content: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Comment', commentSchema);

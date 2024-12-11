const { Schema, model } = require("mongoose");

const PostCommentSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    post: {
        type: Schema.Types.ObjectId,
        ref: "Post",
        required: true,
    },
    reply_to: {
        type: Schema.Types.ObjectId,
        ref: "PostComment",
        required: true,
    },
    reactions: {
        type: [{
            type: Schema.Types.ObjectId,
            ref: "PostCommentReaction",
            required: true,
        }]
    }
}, { strict: true, timestamps: true, versionKey: false });

const PostComment = model("PostComment", PostCommentSchema);

module.exports = PostComment;
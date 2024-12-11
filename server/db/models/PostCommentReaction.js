const { Schema, model } = require("mongoose");

const PostCommentReactionSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    comment: {
        type: Schema.Types.ObjectId,
        ref: "PostComment",
        required: true,
    },
}, { strict: true, timestamps: true, versionKey: false });

const PostCommentReaction = model("PostCommentReaction", PostCommentReactionSchema);

module.exports = PostCommentReaction;
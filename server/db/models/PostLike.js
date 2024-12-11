
const { Schema, model } = require("mongoose");

const PostLikeSchema = new Schema({
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
}, { strict: true, timestamps: true, versionKey: false });

const PostLike = model("PostLike", PostLikeSchema);

module.exports = PostLike;